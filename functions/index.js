const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kairos.asistencia2024@gmail.com',
        pass: 'your-app-password'
    }
});

exports.enviarQRPorEmail = functions.https.onCall(async (data, context) => {
    const { email, nombre, codigo, qrData } = data;
    
    const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(qrData);
    
    const mailOptions = {
        from: 'KAIROS - Control de Asistencia <kairos.asistencia2024@gmail.com>',
        to: email,
        subject: '🎓 Tu Código QR de Asistencia - KAIROS',
        html: `
        <html>
        <body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;">
            <div style="max-width:600px;margin:0 auto;background:white;border-radius:10px;padding:30px;">
                <h2 style="color:#1e3a5f;">🎓 KAIROS - Control de Asistencia</h2>
                <p>Hola <strong>${nombre}</strong>,</p>
                <p>¡Bienvenido al sistema de asistencia escolar!</p>
                <p>Tu código de identificación es: <strong style="font-size:24px;color:#1e3a5f;">${codigo}</strong></p>
                <p style="text-align:center;margin:20px 0;">
                    <img src="${qrUrl}" alt="QR Code" style="border:3px solid #1e3a5f;border-radius:10px;padding:10px;">
                </p>
                <p>Guarda este código QR, lo necesitarás para registrar tu asistencia diariamente en la escuela.</p>
                <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
                <p style="color:#666;font-size:12px;">Este correo fue enviado automáticamente por <strong>KAIROS</strong> - Sistema de Control de Asistencia Escolar</p>
            </div>
        </body>
        </html>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email enviado correctamente' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: error.message };
    }
});