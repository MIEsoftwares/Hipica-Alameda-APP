import React, { useState, useEffect } from "react";
import { FlatList, Image, View, ActivityIndicator, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import ProfileIcon from "../../../components/ProfileIcon"; 
import { Text } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import supabase from "../../../../database/SupabaseConfig";
import AnnouncementCard from "../../../components/AnnouncementCard";
import { Searchbar } from 'react-native-paper';
import { height, width } from "../../../constants/Dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getPublicUrl from "../../../../database/bucket/getPublicUrl";

export default function Home({ navigation }) {
    const [announcements, setAnnouncements] = useState([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [imagem, setImagem] = useState()
    const [link, setLink] = useState()
    const [data, setData] = useState()
    const [modalVisibility, setModalVisibility] = useState(false)
    const [profile, setProfile] = useState("none");

  useEffect(() => {
    const fetchProfileIcon = async () => {
      const icon = await AsyncStorage.getItem("profile-icon");

      if (icon === "none" || !icon) {
        setProfile("none");
      } else {
        const publicUrl = getPublicUrl("Profile-Images", icon);
        setProfile(publicUrl);
      }
    };

    fetchProfileIcon();
  });

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            const fetchAnnouncements = async () => {
                try {
                    const { data, error } = await supabase
                        .from('comunicados')
                        .select('id, titulo, descricao, data_evento, link_externo, imagem');

                    if (error) {
                        throw error;
                    }

                    setAnnouncements(data);
                    setFilteredAnnouncements(data);
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

        const saveAsyncStorageProfileIcon = async (id) => {
            if (!id) return null;
      
            const { data, error } = await supabase
              .from("profiles")
              .select("imagem")
              .eq("id", id)
              .single();
      
            if (error) {
              console.error("Erro ao buscar a imagem:", error.message);
              return null;
            }
      
            AsyncStorage.setItem('profile-icon', data.imagem)
            return
          };
          const fetchData = async () => {
            try {
                const data = await AsyncStorage.getItem('supabase_session');
                
                if (data !== null) {
                    const parsedData = JSON.parse(data);
                    const id = parsedData.user.id;
                    return id;
                } else {
                    console.log("No session found");
                }
            } catch (error) {
                console.error("Error fetching session:", error);
            }
        };
        
        const id = fetchData().then((data) => saveAsyncStorageProfileIcon(data));

    }, [searchQuery, announcements]);

    const renderItem = ({ item }) => (
        <View style={{ marginVertical: height*0.002 }}>
            <AnnouncementCard
                admin={false}
                title={item.titulo}
                description={item.descricao}
                event_date={item.data_evento}
                imagem={item.imagem}
                bucket="Announcement-Images"
                onPress={() => {setModalVisibility(true); setTitle(item.titulo); setDescription(item.descricao); setData(item.data_evento); setImagem(item.imagem); setLink(item.link); }}
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
            return `Data: ${formattedDate} \nHorário: ${formattedTime}`;
          };  
        
        return (
            <View style={styles.modal}>
                <Pressable style={styles.pressable} onPress={() => setModalVisibility(false)}/>
                <View style={styles.form}>
                    <ScrollView>
                        <View style={{gap: 16}}>
                            {imagem !== null ? (<View style={{height: height*0.15, width: "80%", alignSelf: "center"}}><Image style={{ resizeMode: "contain", width: "100%", height: "100%" }} source={{uri: getPublicUrl("Announcement-Images", imagem)}}/></View>) : <Text style={{fontWeight: "bold", fontSize: 18, textAlign: "center"}}>{title}</Text>}
                            <View style={{width:"100%", height: 1, backgroundColor:"black", borderCurve: 5}}/>
                            {imagem !== null && <Text style={{fontWeight: "bold", fontSize: 18, textAlign: "center"}}>{title}</Text>}
                            <Text>{description}</Text>
                            {formattedDate(data) && <Text>{formattedDate(data)}</Text>}
                        </View>
                    </ScrollView>
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
                <ProfileIcon profile={profile} source={require('../../../assets/images/Logo1.png')} />
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