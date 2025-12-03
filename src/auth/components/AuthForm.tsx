import React from 'react'

type Props = {
  children?: React.ReactNode
}

export default function AuthForm({ children }: Props) {
  return (
    <div style={{ maxWidth: 420, margin: '2rem auto', padding: '1rem', border: '1px solid #eee', borderRadius: 8 }}>
      {children}
    </div>
  )
}
