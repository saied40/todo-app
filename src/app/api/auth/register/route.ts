import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
// import { parseForm } from "@/lib/upload";
import User from "@/models/User";
// import bcrypt from "bcryptjs";
import path from "path";
import jwt from "jsonwebtoken";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = process.env.JWT_EXPIRES_IN || "7d";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function POST(req: Request) {
  try {
    await connectDB();

    const errors: { field: string; message: string }[] = [];

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image") as File | null;

    if (!name) {
      errors.push({
        field: "name",
        message: "Name is required",
      });
    }

    if (!email) {
      errors.push({
        field: "email",
        message: "Email is required",
      });
    }

    if (!password) {
      errors.push({
        field: "password",
        message: "Password is required",
      });
    }

    // Save the file manually if needed
    let imagePath = "";
    if (image) {
      if (image.size > MAX_IMAGE_SIZE) {
        errors.push({
          field: "image",
          message: "Image size exceeds 2MB limit",
        });
        return NextResponse.json({ status: "error", errors }, { status: 400 });
      }

      if (!image.type.startsWith("image/")) {
        errors.push({
          field: "image",
          message: "Only image uploads are allowed",
        });
        return NextResponse.json({ status: "error", errors }, { status: 400 });
      }

      if (errors.length > 0) {
        return NextResponse.json({ status: "error", errors }, { status: 400 });
      }

      const ext = path.extname(image.name); // e.g. ".png"
      const baseName = path.basename(image.name, ext);
      const timestamp = new Date().toISOString().replace(/:/g, "-");
      const fileName = `${baseName}-${timestamp}${ext}`;

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public/uploads", fileName);
      await import("fs/promises").then((fs) => fs.writeFile(uploadDir, buffer));
      imagePath = `${BASE_URL}/uploads/${fileName}`;
    }

    const hashedPassword = await import("bcryptjs").then((b) =>
      b.hash(password, 10)
    );

    // --- Generate 6-digit verification code ---
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image: imagePath,
      isVerified: false,
      verificationToken: verificationCode,
      verificationCodeExpires,
    });

    // --- Send email (simplified version) ---
    await import("@/lib/mailer").then(({ sendEmail }) =>
      sendEmail({
        to: email,
        subject: "Your verification code",
        text: `Your verification code is: ${verificationCode}`,
      })
    );

    return NextResponse.json(
      { status: "success", message: "Verification code sent to email" },
      { status: 201 }
    );

    // const token = jwt.sign(
    //   { userId: newUser._id, email: newUser.email },
    //   JWT_SECRET,
    //   { expiresIn: JWT_EXPIRATION } as jwt.SignOptions
    // );

    // return NextResponse.json(
    //   {
    //     status: "success",
    //     token,
    //     user: {
    //       _id: newUser._id,
    //       name: newUser.name,
    //       email: newUser.email,
    //       image: newUser.image,
    //       isVerified: newUser.isVerified,
    //       createdAt: newUser.createdAt,
    //       updatedAt: newUser.updatedAt,
    //     },
    //   },
    //   { status: 201 }
    // );
  } catch (error) {
    const err = error as any;

    // Duplicate email
    if (err.code === 11000 && err.keyPattern?.email) {
      return NextResponse.json(
        {
          status: "error",
          errors: [
            { field: "email", message: "This email is already registered" },
          ],
        },
        { status: 400 }
      );
    }

    // Validation errors (e.g. missing fields from schema)
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(
        (err: any) => ({ field: err.path, message: err.message })
      );
      return NextResponse.json(
        { status: "error", errors },
        { status: 400 }
      );
    }

    // Fallback for other errors
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
};
