import React, { useState, useEffect } from "react";
import { FlatList, Image, View, ActivityIndicator, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import ProfileIcon from "../../../components/ProfileIcon"; 
import { Text } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import supabase from "../../../../database/SupabaseConfig";
import AnnouncementCard from "../../../components/AnnouncementCard";
import { Searchbar } from 'react-native-paper';
import { height, width } from "../../../constants/Dimensions";

export default function Home({ navigation }) {
    const [announcements, setAnnouncements] = useState([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [link, setLink] = useState()
    const [data, setData] = useState()
    const [modalVisibility, setModalVisibility] = useState(false)

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
                    setFilteredAnnouncements(data); // Set filtered announcements initially
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

    useEffect(() => {
        if (searchQuery) {
            setFilteredAnnouncements(
                announcements.filter(item =>
                    item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.descricao.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredAnnouncements(announcements);
        }
    }, [searchQuery, announcements]);

    const renderItem = ({ item }) => (
        <View style={{ marginVertical: height*0.002 }}>
            <AnnouncementCard
                admin={false}
                title={item.titulo} 
                description={item.descricao}
                event_date={item.data_evento}
                onPress={() => {setModalVisibility(true); setTitle(item.titulo); setDescription(item.descricao); setData(item.data_evento)}}
            />
        </View>
    );

    function openModal() {
        
        const formattedDate = (date) => {
            if (!date) return "";
            const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            const formattedTime = new Date(date).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return `Data: ${formattedDate} \n Horário: ${formattedTime}`;
          };  
        
        return (
            <View style={styles.modal}>
                <Pressable style={styles.pressable} onPress={() => setModalVisibility(false)}/>
                <View style={styles.form}>
                    <Text style={{fontWeight: "bold", fontSize: 18, textAlign: "center"}}>{title}</Text>
                    <View style={{width:"100%", height:"1%", backgroundColor:"black", borderCurve: 5}}/>
                    <Text>{description}</Text>
                    <Text>{formattedDate(data)}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Searchbar
                    placeholder="Buscar"
                    theme={{ colors: { elevation: { level3: "white" } } }}
                    style={{width: width*0.8, borderWidth: 1, borderRadius: 20, marginBottom: 12, marginLeft: width*0.03 }}
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                <ProfileIcon source={require('../../../assets/images/Logo1.png')} />
            </View>
            {modalVisibility && 
                        openModal()}
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", flex: 1 }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#000000" />
                ) : filteredAnnouncements.length === 0 ? (
                    <>
                        <Image style={styles.image} source={require('../../../assets/images/home-inicial-photo.png')} />
                        <Text style={styles.titleWhileHasNothing}>Você encontrará notificações aqui</Text>
                        <Text style={styles.subtitleWhileHasNothing}>Fique por dentro de atividades relevantes, como comunicados, agenda e notificações de eventos e aulas.</Text>
                    </>
                ) : (
                    <FlatList
                        data={filteredAnnouncements}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
            
        </SafeAreaView>
    );
}