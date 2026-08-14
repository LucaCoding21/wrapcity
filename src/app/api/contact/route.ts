import { Resend } from "resend";
import { NextResponse } from "next/server";
import { isLikelyBot } from "@/lib/form-guard";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactBody = {
  website?: string;
  token?: string;

  category: string;
  name: string;
  email: string;
  phone: string;

  // automotive
  serviceType: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  currentColor: string;
  doorType: string;
  desiredColor: string;
  doorJamb: string;
  designNeeded: string;
  perforatedWindowFilm: boolean;
  designIdeas: string;
  referral: string;
  additionalInfo: string;

  // architectural
  projectType: string;
  surfaceType: string;
  hasDamage: string;
  areaSize: string;
  archDesignNeeded: string;
  businessName: string;
  archReferral: string;
  archAdditionalInfo: string;

  // marine
  city: string;
  projectIdea: string;
};

function row(label: string, value: string | boolean | undefined) {
  if (!value && value !== false) return "";
  const display = typeof value === "boolean" ? (value ? "Yes" : "No") : value;
  if (!display) return "";
  return `
    <tr>
      <td style="padding: 8px 12px; color: #666; font-weight: bold; white-space: nowrap; vertical-align: top;">${label}</td>
      <td style="padding: 8px 12px; color: #333;">${display}</td>
    </tr>`;
}

function buildAutomotiveHtml(data: ContactBody) {
  return `
    <h2 style="color: #FF2D95; margin: 0 0 16px;">Automotive Wrap Request</h2>
    <table style="width: 100%; border-collapse: collapse;">
      ${row("Service Type", data.serviceType)}
      ${row("Vehicle", `${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}`)}
      ${row("Current Color", data.currentColor)}
      ${row("Door Config", data.doorType)}
      ${row("Desired Color", data.desiredColor)}
      ${row("Door Jambs", data.doorJamb)}
      ${row("Design Needed", data.designNeeded)}
      ${row("Perf. Window Film", data.perforatedWindowFilm)}
      ${row("Design Ideas", data.designIdeas)}
      ${row("Referral", data.referral)}
      ${row("Additional Info", data.additionalInfo)}
    </table>`;
}

function buildArchitecturalHtml(data: ContactBody) {
  return `
    <h2 style="color: #FF2D95; margin: 0 0 16px;">Architectural Project Request</h2>
    <table style="width: 100%; border-collapse: collapse;">
      ${row("Project Type", data.projectType)}
      ${row("Surface Type", data.surfaceType)}
      ${row("Surface Damage", data.hasDamage)}
      ${row("Area Size", data.areaSize)}
      ${row("Design Needed", data.archDesignNeeded)}
      ${row("Business Name", data.businessName)}
      ${row("Referral", data.archReferral)}
      ${row("Additional Info", data.archAdditionalInfo)}
    </table>`;
}

function buildMarineHtml(data: ContactBody) {
  return `
    <h2 style="color: #FF2D95; margin: 0 0 16px;">Marine Project Inquiry</h2>
    <table style="width: 100%; border-collapse: collapse;">
      ${row("City", data.city)}
      ${row("Project Details", data.projectIdea)}
    </table>`;
}

function getCategoryLabel(category: string) {
  if (category === "automotive") return "Automotive";
  if (category === "architectural") return "Architectural";
  if (category === "marine") return "Marine";
  return category;
}

export async function POST(request: Request) {
  try {
    const data: ContactBody = await request.json();

    // Fake success so bots don't learn they were filtered
    if (isLikelyBot(data)) {
      return NextResponse.json({ success: true });
    }

    if (!data.name || !data.email || !data.category) {
      return NextResponse.json(
        { error: "Name, email, and category are required" },
        { status: 400 }
      );
    }

    let detailsHtml = "";
    if (data.category === "automotive") detailsHtml = buildAutomotiveHtml(data);
    else if (data.category === "architectural") detailsHtml = buildArchitecturalHtml(data);
    else if (data.category === "marine") detailsHtml = buildMarineHtml(data);

    await resend.emails.send({
      from: "Wrap City <wrapcity@cloverfield.studio>",
      to: ["nguyen.william0121@gmail.com", "taylor@wrapcity.co"],
      subject: `New ${getCategoryLabel(data.category)} Estimate Request from ${data.name}`,
      replyTo: data.email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a1a; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #FF2D95; margin: 0; font-size: 24px;">
              New ${getCategoryLabel(data.category)} Estimate Request
            </h1>
            <p style="color: #999; margin: 8px 0 0; font-size: 14px;">from ${data.name}</p>
          </div>
          <div style="background: #f9f9f9; padding: 24px;">
            <h3 style="color: #333; margin: 0 0 12px; border-bottom: 2px solid #FF2D95; padding-bottom: 8px;">Contact Info</h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${row("Name", data.name)}
              ${row("Email", `<a href="mailto:${data.email}">${data.email}</a>`)}
              ${row("Phone", data.phone ? `<a href="tel:${data.phone}">${data.phone}</a>` : "")}
            </table>
          </div>
          <div style="background: #fff; padding: 24px; border-radius: 0 0 8px 8px;">
            <h3 style="color: #333; margin: 0 0 12px; border-bottom: 2px solid #FF2D95; padding-bottom: 8px;">Project Details</h3>
            ${detailsHtml}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form email error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
