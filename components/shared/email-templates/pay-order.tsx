interface Props {
	orderId: number
	totalAmount: number
	paymentUrl: string
}

export const PayOrderTemplate = ({
	orderId,
	totalAmount,
	paymentUrl,
}: Props) => {
	return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f4f1ee; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .order-info { background-color: #f4f1ee; padding: 20px; border-radius: 4px; margin: 20px 0; }
          .button { display: inline-block; background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 20px; font-size: 14px; color: #666; }
          .logo { font-size: 24px; font-weight: bold; color: #333; }
          .amount { font-size: 24px; font-weight: bold; color: #000; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Next Pizza 🍕</div>
          </div>
          <div class="content">
            <h2>Оплата замовлення #${orderId}</h2>
            <p>Дякуємо за ваше замовлення! Для завершення покупки, будь ласка, оплатіть замовлення.</p>
            
            <div class="order-info">
              <p>Номер замовлення: <strong>#${orderId}</strong></p>
              <p>Сума до сплати: <span class="amount">${totalAmount} ₴</span></p>
            </div>

            <p>Для оплати замовлення натисніть на кнопку нижче:</p>
            <a href="${paymentUrl}" class="button">Оплатити замовлення</a>
            
            <p style="margin-top: 20px; font-size: 14px;">Якщо кнопка не працює, скопіюйте та вставте це посилання в браузер:<br>
            <a href="${paymentUrl}" style="color: #666; word-break: break-all;">${paymentUrl}</a></p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Next Pizza. Всі права захищені.</p>
          </div>
        </div>
      </body>
    </html>
  `
}
