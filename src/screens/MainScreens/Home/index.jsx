import React, { useState, useEffect } from "react";
import { FlatList, Image, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import ProfileIcon from "../../../components/ProfileIcon"; 
import SearchBar from "../../../components/SearchBar";
import { Text } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import supabase from "../../../../database/SupabaseConfig";
import AnnouncementCard from "../../../components/AnnouncementCard";

export default function Home({ navigation }) {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            const fetchAnnouncements = async () => {
                try {
                    const { data, error } = await supabase
                        .from('comunicados')
                        .select('id, titulo, descricao, data_evento, link_externo');

                    if (error) {
                        throw error;
                    }

                    setAnnouncements(data);
                } catch (error) {
                    console.error('Erro ao buscar dados:', error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchAnnouncements();

            const beforeRemoveListener = navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
            });

            return beforeRemoveListener;
        }
    }, [isFocused, navigation]);

    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 12 }}>
            <AnnouncementCard
                title={item.titulo} 
                description={item.descricao} 
                onPress={() => {
                    setTitle(item.titulo);
                    setDescription(item.descricao);
                    setData(item.data_evento);
                    setLink(item.link_externo);
                    setUpdateModalVisibility(true);
                    setId(item.id);
                }}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <SearchBar />
                <ProfileIcon source={require('../../../assets/images/Logo1.png')} />
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", flex: 1 }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#000000" />
                ) : announcements.length === 0 ? (
                    <>
                        <Image style={styles.image} source={require('../../../assets/images/home-inicial-photo.png')} />
                        <Text style={styles.titleWhileHasNothing}>Você encontrará notificações aqui</Text>
                        <Text style={styles.subtitleWhileHasNothing}>Fique por dentro de atividades relevantes, como comunicados, agenda e notificações de eventos e aulas.</Text>
                    </>
                ) : (
                    <FlatList
                        data={announcements}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
