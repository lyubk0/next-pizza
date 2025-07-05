import { CartItemDTO } from '@/services/dto/cart'

interface Props {
	orderId: number
	totalAmount: number
	items: CartItemDTO[]
}

export const OrderSuccessTemplate = ({
	orderId,
	totalAmount,
	items,
}: Props) => {
	const itemsList = items
		.map(
			item => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${item.productItem.product.name}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">${item.productItem.price} ₴</td>
      </tr>
    `
		)
		.join('')

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
          .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .items-table th { text-align: left; padding: 10px 0; border-bottom: 2px solid #000; }
          .total-row { font-weight: bold; font-size: 18px; }
          .total-row td { padding-top: 20px !important; border-bottom: none !important; }
          .footer { text-align: center; margin-top: 20px; font-size: 14px; color: #666; }
          .logo { font-size: 24px; font-weight: bold; color: #333; }
          .success-icon { font-size: 48px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Next Pizza 🍕</div>
          </div>
          <div class="content">
            <div style="text-align: center;">
              <div class="success-icon">✅</div>
              <h2>Замовлення успішно оплачено!</h2>
            </div>
            
            <div class="order-info">
              <p>Номер замовлення: <strong>#${orderId}</strong></p>
              <p>Статус: <strong>Оплачено</strong></p>
            </div>

            <h3>Деталі замовлення:</h3>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Товар</th>
                  <th style="text-align: center;">Кількість</th>
                  <th style="text-align: right;">Ціна</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
                <tr class="total-row">
                  <td colspan="2">Всього до сплати:</td>
                  <td style="text-align: right;">${totalAmount} ₴</td>
                </tr>
              </tbody>
            </table>

            <p>Дякуємо за ваше замовлення! Ми вже почали його готувати і скоро доставимо.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Next Pizza. Всі права захищені.</p>
          </div>
        </div>
      </body>
    </html>
  `
}
