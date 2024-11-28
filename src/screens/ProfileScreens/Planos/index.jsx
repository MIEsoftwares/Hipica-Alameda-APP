import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlanCard from '../../../components/PlanCard';
import defaultStyles from '../../../constants/defaultStyles';
import supabase from "../../../../database/SupabaseConfig";
import { Text } from 'react-native-paper';

export default function Planos({ navigation }) {
  const [planos, setPlanos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlanos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('planosaula').select('*');
    if (error) {
      console.error('Erro ao buscar dados:', error);
    } else {
      setPlanos(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlanos();
  }, []);

  const renderItem = ({ item }) => (
    <PlanCard
      title={item.nome}
      description={`Valor: R$${item.valor}/mês`}
      onPress={() =>
        navigation.navigate('RealizarPagamento', { plano: item })
      }
    />
  );

  return (
    <SafeAreaView style={defaultStyles.container}>
      {loading ? (
        <View>
          <Text>Carregando planos...</Text>
        </View>
      ) : (
        <FlatList
          data={planos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}