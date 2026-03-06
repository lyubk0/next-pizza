import * as React from 'react'

interface PayOrderTemplateProps {
	code: string
}

export const VerificationUserTemplate: React.FC<PayOrderTemplateProps> = ({
	code,
}) =>
	`
  <div>
    <p>
      Your verification code: <h2>${code}</h2>
    </p>
    <p>
      <a href="${process.env.NEXTAUTH_URL}/api/auth/verify?code=${code}">
        Confirm registration
      </a>
    </p>
  </div>
`
