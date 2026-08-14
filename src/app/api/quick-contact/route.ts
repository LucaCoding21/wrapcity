import { Resend } from "resend";
import { NextResponse } from "next/server";
import { isLikelyBot } from "@/lib/form-guard";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, website, token } = await request.json();

    // Fake success so bots don't learn they were filtered
    if (isLikelyBot({ website, token })) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Wrap City <wrapcity@cloverfield.studio>",
      to: ["nguyen.william0121@gmail.com", "taylor@wrapcity.co"],
      subject: `Quick Contact: ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #FF2D95; margin: 0; font-size: 24px;">New Quick Contact</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 100px;">Name</td>
                <td style="padding: 8px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Email</td>
                <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${phone ? `<tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Phone</td>
                <td style="padding: 8px 0; color: #333;"><a href="tel:${phone}">${phone}</a></td>
              </tr>` : ""}
            </table>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quick contact email error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
