import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();
    const errors = [];

    const { email, password } = await req.json();

    // --- Validate inputs ---
    if (!email) {
      errors.push({ field: "email", message: "Email is required" });
    }
    if (!password) {
      errors.push({ field: "password", message: "Password is required" });
    }
    if (!email || !password) {
      return NextResponse.json(
        {
          status: "error",
          errors,
        },
        { status: 400 }
      );
    }

    const { default: User } = await import("@/models/User");
    const bcrypt = await import("bcryptjs");

    // --- Find the user by email ---
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          errors: [{ field: "email", message: "Invalid email or password" }],
        },
        { status: 401 }
      );
    }

    // --- Compare passwords ---
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          status: "error",
          errors: [{ field: "password", message: "Invalid email or password" }],
        },
        { status: 401 }
      );
    }

    // --- Generate JWT token ---
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET not defined");
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    } as jwt.SignOptions);

    // --- Return response ---
    return NextResponse.json(
      {
        status: "success",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
};
