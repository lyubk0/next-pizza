<<<<<<< HEAD
import * as React from "react";

interface PayOrderTemplateProps {
  code: string;
}

export const VerificationUserTemplate: React.FC<PayOrderTemplateProps> = ({
  code,
}) =>
  `
  <div>
    <p>
      Ваш код підтвердження: <h2>${code}</h2>
    </p>
    <p>
      <a href="${process.env.NEXTAUTH_URL}/api/auth/verify?code=${code}">
        Підтвердіть реєстрацію
      </a>
    </p>
  </div>
`;
=======
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
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
