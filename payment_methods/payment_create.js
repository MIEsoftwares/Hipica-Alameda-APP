export default async function paymentCreate(valor, desc, email) {
    const accessToken = 'TEST-6684662862805898-090818-c1c5e6fc9a3414dc69429b2f1c896992-1407179279';
    const idempotencyKey = 'some-unique-key';

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