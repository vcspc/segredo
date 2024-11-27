import './globals.css'

    export const metadata = {
      title: 'Segredo',
      description: 'Encriptador e desencriptador de mensagens',
    }

    export default function RootLayout({ children }) {
      return (
        <html lang="pt-br">
          <body>{children}</body>
        </html>
      )
    }
