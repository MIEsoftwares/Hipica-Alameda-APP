import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { TextInput } from 'react-native-paper';
import defaultStyles from '../../../constants/defaultStyles';
import supabase from '../../../../database/SupabaseConfig';
import paymentCreate from '../../../../payment_methods/payment_create';
import * as Clipboard from 'expo-clipboard';
import { height } from '../../../constants/Dimensions';

export default function RealizarPagamento({ route, navigation }) {
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [loading, setLoading] = useState(true);
  const { plano } = route.params;
  
  useEffect(() => {
    
    const mercadoPagoKey = "TEST-6684662862805898-090818-c1c5e6fc9a3414dc69429b2f1c896992-1407179279";

    const generatePayment = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const userEmail = user.email;

        const pagamento = await paymentCreate(plano.price, plano.desc, userEmail, mercadoPagoKey);
        setQrCodeValue(pagamento.point_of_interaction.transaction_data.qr_code);

        setLoading(false);
      } catch (error) {
        console.error('Erro ao realizar o pagamento:', error);
        setLoading(false);
      }
    };
    
    generatePayment();
  }, [route.params]);

  const copyToClipboard = () => {
    Clipboard.setString(qrCodeValue);
    alert('QR Code copiado para a área de transferência!');
  };

  if (loading) {
    return (
      <SafeAreaView style={defaultStyles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#000000" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.content}>
        {qrCodeValue ? (
          <>
            <View style={{gap: height*0.015}}>
              <Text style={styles.title}>{plano.desc}</Text>
              <Text style={styles.price}>Preço: R$ {plano.price}/mês</Text>
            </View>
            <View style={{alignItems: "center"}}>
              <QRCode
                value={qrCodeValue}
                size={200}
                color="black"
                backgroundColor="white"
              />
              <TextInput
                mode="outlined"
                style={styles.input}
                value={qrCodeValue}
                editable={false}
                right={<TextInput.Icon icon="content-copy" color="#B2B2B2" size={20} onPress={copyToClipboard} />}
              />
            </View>
          </>
        ) : (
          <Text>Erro ao gerar QR Code</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: height*0.1,
    flex: 1,
    padding: 20,
  },
  input: {
    marginTop: 20,
    width: '100%',
    height: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000000',
  },
  title: {
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: 22,
    fontWeight: "bold",
  },
  price: { 
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: 18,
  }
});