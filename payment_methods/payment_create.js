import paymentData from "../database/MercadoPagoData.json"


export default async function paymentCreate(valor, desc, email) {
    const { accessToken, idempotencyKey } = paymentData;

    try {
        const response = await fetch('https://api.mercadopago.com/v1/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-Idempotency-Key': idempotencyKey
            },
            body: JSON.stringify({
                transaction_amount: valor,
                description: desc,
                payment_method_id: 'pix',
                payer: {
                    email: email
                },
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}