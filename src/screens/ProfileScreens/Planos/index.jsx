import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlanCard from '../../../components/PlanCard';

export default function Planos({ navigation }){

  const p4 = 150
  const p8 = 300
  const p12 = 450

  return (
    <SafeAreaView>
        <PlanCard title="Pacote de 4 aulas" description={`Valor: R$${p4}/mês`}/>
        <PlanCard title="Pacote de 8 aulas" description={`Valor: R$${p8}/mês`}/>
        <PlanCard title="Pacote de 12 aulas" description={`Valor: R$${p12}/mês`}/>
    </SafeAreaView>
  );
}
