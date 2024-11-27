import './globals.css'

    export const metadata = {
      title: 'Message Encrypter',
      description: 'Encrypt and decrypt messages with a key',
    }

    export default function RootLayout({ children }) {
      return (
        <html lang="en">
          <body>{children}</body>
        </html>
      )
    }
