import React, { ReactNode } from 'react'

export default function layout({
  children
}: { children: ReactNode }) {
  return <html>
    <body>
      {children}
    </body>
  </html>
}
