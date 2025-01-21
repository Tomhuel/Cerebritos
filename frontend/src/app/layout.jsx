import SessionAuthProvider from '@/context/ServiceProvider'
import './styles.css'
import React from 'react'

export default function RootLayout({ children }) {
  return (
    <React.StrictMode>
      <html lang="es">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="author" content="Tomhuel" />
          <title>Cerebritos</title>
          <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossOrigin="anonymous"></script>
        </head>
        <body>
          <SessionAuthProvider>
            {children}
          </SessionAuthProvider>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossOrigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js" crossOrigin="anonymous"></script>
        </body>
      </html>
    </React.StrictMode>
  )
}
