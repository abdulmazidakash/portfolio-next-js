// src/app/api/send-email/route.ts

import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getContactEmailHtml } from "@/components/modules/contact/EmailTemplate";
// Import the email template function

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const receivedAt = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Dhaka",
    });

    // Generate HTML using the isolated file function
    const htmlContent = getContactEmailHtml({
      safeName,
      safeEmail,
      safeMessage,
      receivedAt,
    });

    const { error } = await resend.emails.send({
      from: "Portfolio Contact Akash - Next.js <onboarding@resend.dev>", 
      to: process.env.CONTACT_RECEIVER_EMAIL || "",
      replyTo: email,
      subject: `New portfolio Next.js message from ${name}`,
      html: htmlContent, // Injected cleanly here
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}