const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vm4595228@gmail.com',
        pass: 'ypdoiwghszlkijqg',
    },
});

async function main(email, token) {
    const info = await transporter.sendMail({
        from: 'vm4595228@gmail.com',
        to: email,
        subject: "Reset Your Sonique Music Account Password",
        text: "Reset your password on Sonique Music",
        html: `
        <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f9; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #2b2b2b;">Hello,</h2>
                    <p style="font-size: 16px;">We received a request to reset your password for your Sonique Music account. To proceed, please click the link below to set a new password.</p>
                    
                    <p style="font-size: 16px; margin: 20px 0;">
                        <a href='https://sonique-user.vercel.app/sonique/user/reset-password?token=${token}' style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">Reset Password</a>
                    </p>
                    
                    <p style="font-size: 14px; color: #777;">If you didn’t request a password reset, please ignore this email. Rest assured, your account is still safe!</p>
                    
                    <hr style="border-top: 1px solid #ddd; margin-top: 40px;">
                    
                    <h3 style="color: #2b2b2b;">Why Choose Sonique Music?</h3>
                    <p style="font-size: 16px;">Sonique Music offers the latest hits, exclusive tracks, and a community of music lovers from around the world. Whether you're a casual listener or a hardcore fan, our platform delivers seamless music streaming tailored just for you.</p>
                    
                    <h4 style="color: #2b2b2b;">What We Offer:</h4>
                    <ul style="font-size: 16px; line-height: 1.8; color: #555;">
                        <li><strong>Curated Playlists</strong>: Find the perfect music for any moment.</li>
                        <li><strong>Discover New Artists</strong>: Support up-and-coming musicians.</li>
                        <li><strong>High-Quality Audio</strong>: Stream music with crystal-clear sound.</li>
                        <li><strong>Personalized Recommendations</strong>: Enjoy music based on your preferences.</li>
                    </ul>
                    
                    <h4 style="color: #2b2b2b;">Stay Connected</h4>
                    <p style="font-size: 16px;">Follow us on our social media to get the latest updates, discover new content, and engage with the Sonique community!</p>
                    <div style="text-align: center; margin-top: 20px;">
                        <a href="https://www.facebook.com/soniquemusic" target="_blank" style="text-decoration: none; padding: 10px 20px; background-color: #3b5998; color: white; font-weight: bold; border-radius: 5px; margin-right: 10px;">Facebook</a>
                        <a href="https://twitter.com/soniquemusic" target="_blank" style="text-decoration: none; padding: 10px 20px; background-color: #00acee; color: white; font-weight: bold; border-radius: 5px; margin-left: 10px;">Twitter</a>
                    </div>

                    <div style="margin-top: 40px; padding: 10px; background-color: #333; color: white; text-align: center; font-size: 14px;">
                        <p>Best regards,</p>
                        <p>The Sonique Music Team</p>
                        <p style="font-size: 12px; color: #bbb;">If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:support@soniquemusic.com" style="color: #bbb; text-decoration: none;">support@soniquemusic.com</a>.</p>
                    </div>
                </div>
            </body>
        </html>
        `,
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = main;
