import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlanCard from '../../../components/PlanCard';
import defaultStyles from '../../../constants/defaultStyles';

export default function Planos({ navigation }){

  const descPlanos = {
    p4: {
      desc: "Hípica Alameda Pacote de 4 Aulas",
      price: 150
    },
    p8: {
      desc: "Hípica Alameda Pacote de 8 Aulas",
      price: 300
    },
    p12: {
      desc: "Hípica Alameda Pacote de 12 Aulas",
      price: 450
    }
  }

  return (
    <SafeAreaView style={defaultStyles.container}>
        <PlanCard title="Pacote de 4 aulas" description={`Valor: R$${descPlanos.p4.price}/mês`} onPress={() => navigation.navigate("RealizarPagamento", {plano: descPlanos.p4})} />
        <PlanCard title="Pacote de 8 aulas" description={`Valor: R$${descPlanos.p8.price}/mês`} onPress={() => navigation.navigate("RealizarPagamento", {plano: descPlanos.p8})} />
        <PlanCard title="Pacote de 12 aulas" description={`Valor: R$${descPlanos.p12.price}/mês`} onPress={() => navigation.navigate("RealizarPagamento", {plano: descPlanos.p12})} />
    </SafeAreaView>
  );
}
