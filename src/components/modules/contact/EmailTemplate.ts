// src/app/api/send-email/emailTemplate.ts

interface EmailTemplateProps {
  safeName: string;
  safeEmail: string;
  safeMessage: string;
  receivedAt: string;
}

export function getContactEmailHtml({ safeName, safeEmail, safeMessage, receivedAt }: EmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f1f5f9; font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">

            <tr>
              <td style="background:linear-gradient(135deg,#0284c7,#0d9488); padding:28px 32px;">
                <p style="margin:0; color:#ffffff; font-size:13px; font-weight:600; letter-spacing:1px; text-transform:uppercase; opacity:0.85;">
                  Portfolio Contact Form
                </p>
                <h1 style="margin:6px 0 0; color:#ffffff; font-size:22px; font-weight:700;">
                  New message received
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:16px;">
                      <p style="margin:0 0 4px; font-size:12px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; color:#64748b;">
                        Name
                      </p>
                      <p style="margin:0; font-size:15px; color:#0f172a;">${safeName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:16px; border-top:1px solid #e2e8f0; padding-top:16px;">
                      <p style="margin:0 0 4px; font-size:12px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; color:#64748b;">
                        Email
                      </p>
                      <p style="margin:0; font-size:15px;">
                        <a href="mailto:${safeEmail}" style="color:#0284c7; text-decoration:none;">${safeEmail}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="border-top:1px solid #e2e8f0; padding-top:16px;">
                      <p style="margin:0 0 8px; font-size:12px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; color:#64748b;">
                        Message
                      </p>
                      <p style="margin:0; font-size:15px; line-height:1.6; color:#334155; background-color:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">
                        ${safeMessage}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 32px; background-color:#f8fafc; border-top:1px solid #e2e8f0;">
                <p style="margin:0; font-size:12px; color:#94a3b8;">
                  Received on ${receivedAt} (Dhaka time) &middot; Sent from your latest next.js resend email portfolio contact form
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}