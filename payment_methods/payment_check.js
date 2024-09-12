import paymentData from "../database/MercadoPagoData.json"

export default async function payment_check(paymentId) {

    const {accessToken} = paymentData
    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao verificar o status do pagamento:', error);
    }
}