<<<<<<< HEAD
import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  template: string
) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  try {
    const result = await transport.verify();
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  try {
    const sendResult = await transport.sendMail({
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      html: template,
    });
  } catch (error) {
    console.log(error);
  }
};
=======
import nodemailer from 'nodemailer'

export const sendEmail = async (
	to: string,
	subject: string,
	template: string,
) => {
	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.NODEMAILER_USER,
			pass: process.env.NODEMAILER_PASS,
		},
	})

	try {
		const result = await transport.verify()
		console.log(result)
	} catch (error) {
		console.log(error)
	}

	try {
		const sendResult = await transport.sendMail({
			from: process.env.NODEMAILER_USER,
			to,
			subject,
			html: template,
		})
	} catch (error) {
		console.log(error)
	}
}
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
