import nodemailer from 'nodemailer'
import { config } from './config.js'
//Configurar el transportador para enviar correos
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.APPUSER.USER,
        pass: config.APPUSER.PASS
    }
})
//Definir a quien se le va a enviar el correo
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"soporte CineMark" <${config.APPUSER.USER}>`,
            to: to,
            subject: subject,
            text: text,
            html: html
        })
        return info
    } catch (err) {
        console.log("error: ", err)
    }
}
//Generar el codigo HTML para el diseño del cuerpo del correo
const HTMLRecoveryEmail = (code) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Recuperación de contraseña</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.4/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        .code-box {
          letter-spacing: 0.5rem;
          font-weight: 800;
        }
        .email-container {
          max-width: 600px;
        }
      </style>
    </head>
    <body class="bg-light">
      <div class="container email-container bg-white rounded-3 shadow-sm p-4 mt-5 mb-5">
        <div class="text-center mb-4">
          <img src="https://via.placeholder.com/150x50?text=EPA+Logo" alt="Company Logo" class="img-fluid mb-3">
          <h1 class="h3 fw-bold text-primary">Recuperación de contraseña</h1>
        </div>
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body">
            <p class="card-text">Hola,</p>
            <p class="card-text">Recibimos una solicitud para restablecer tu contraseña. Por favor utiliza el siguiente código de verificación:</p>
            <div class="d-flex justify-content-center my-4">
              <div class="bg-primary text-white p-3 rounded-2 text-center code-box">
                ${code}
              </div>
            </div>
            <p class="card-text text-muted small">
              <i class="bi bi-exclamation-circle me-1"></i> Este código expirará en <strong>20 minutos</strong>.
            </p>
          </div>
        </div>
        <div class="text-center text-muted small mt-4">
          <p class="mb-1">Si no solicitaste este correo, puedes ignorarlo.</p>
          <hr class="my-2">
          <p class="mb-0">¿Necesitas ayuda? <a href="mailto:soporte@epa.com" class="text-decoration-none">Contáctanos</a></p>
        </div>
      </div>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    </body>
    </html>
  `
}
export { sendEmail, HTMLRecoveryEmail }