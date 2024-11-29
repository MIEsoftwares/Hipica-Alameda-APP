import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as Papa from "papaparse";
import { signUpWithEmail } from "../../../../database/auth/register";
import DefButton from "../../../components/DefButton";
import defaultStyles from "../../../constants/defaultStyles";
import { height, width } from "../../../constants/Dimensions";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function RegisterBySheet() {
  const [fileName, setFileName] = useState(null);
  const [fileUri, setFileUri] = useState(null); // Adicionando estado para armazenar o URI do arquivo

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
        type: [
            "text/comma-separated-values",
            "text/csv",
            "application/csv",
        ],
      copyToCacheDirectory: true,
    });

    if (result.size !== 0) {
      setFileName(result.assets[0].name);
      setFileUri(result.assets[0].uri);
    } else {
      setFileName(null);
      setFileUri(null);
    }
  };

  const processCSV = (uri) => {
    // Lê o arquivo CSV ou Excel
    fetch(uri)
      .then((response) => response.text()) // Lê o arquivo como texto
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true, // Garante que a primeira linha é tratada como cabeçalho
          skipEmptyLines: true, // Ignora linhas vazias
          complete: (result) => {
            const users = result.data; // Dados do CSV

            // Para cada usuário no arquivo, chama a função de registro
            users.forEach((user) => {
              const {
                email,
                password,
                name,
                cpf,
                phone,
                hasHorse,
                horseName,
                role,
                tipoDeAula,
              } = user;
              
              // Chama a função para registrar o usuário
              signUpWithEmail(
                email,
                password,
                name,
                cpf,
                phone,
                hasHorse,
                horseName,
                role,
                tipoDeAula
              )
                .then(() =>
                  Alert.alert("Sucesso", "Usuário registrado com sucesso!")
                )
                .catch((error) =>
                  Alert.alert(
                    "Erro",
                    `Erro ao registrar usuário: ${error.message}`
                  )
                );
            });
          },
        });
      })
      .catch((error) => {
        Alert.alert("Erro", "Falha ao processar o arquivo.");
        console.error(error);
      });
  };

  const handleConfirm = () => {
    if (fileUri) {
      processCSV(fileUri); // Processa o arquivo e registra os usuários
    } else {
      Alert.alert("Erro", "Nenhum arquivo selecionado.");
    }
  };

  const handleDeselect = () => {
    setFileName(null);
    setFileUri(null);
    Alert.alert("Sucesso!", "O arquivo foi limpo, agora você pode selecionar outro.");
  };

  return (
    <View style={[defaultStyles.containerWHeader, { paddingTop: 64 }]}>
      <DefButton
        children="Selecionar arquivo CSV"
        style={{
          alignSelf: "center",
          borderRadius: 12,
          width: width * 0.9,
          height: height * 0.275,
          backgroundColor: "#44444480",
          gap: 48,
        }}
        labelStyle={{ fontSize: 22, fontWeight: "bold" }}
        icon={<Ionicons name="add" size={48} color="#FFFFFF" />}
        onPress={pickDocument}
      />

      {fileName && (
        <>
          <Text style={{ marginTop: 32, fontSize: 22, fontWeight: "500", marginBottom: 12,}}>
            O Arquivo foi selecionado!
          </Text>
          <View style={{ flexDirection: "row", gap: 12,}}>
            <Text style={{fontSize: 18, fontWeight: "400"}}>Arquivo:</Text> 
            <View style={{flexDirection: "row", alignItems: "center", gap: 8}}>
              <Ionicons name="document-attach-outline" size={24}/>
              <Text style={{fontSize: 16}}>{fileName}</Text>
            </View>
          </View>
          
          <DefButton
            children="Limpar arquivo"
            style={{
              alignSelf: "center",
              borderRadius: 12,
              width: width * 0.9,
              backgroundColor: "#FF4C4C",
              marginBottom: 20,
              flexDirection: "row-reverse",
              gap: 5,
              position: "absolute",
              bottom: 259,
              
            }}
            labelStyle={{ fontSize: 22 }}
            icon={<Ionicons name="close" size={24} color="#FFFFFF" />}
            onPress={handleDeselect}
          />
        </>
      )}

      <DefButton
        children="Confirmar"
        style={{
          alignSelf: "center",
          borderRadius: 12,
          width: width * 0.9,
          backgroundColor: "#53C64D",
          flexDirection: "row-reverse",
          gap: 16,
          position: "absolute",
          bottom: 214
        }}
        labelStyle={{ fontSize: 22 }}
        icon={<Ionicons name="save" size={24} color="#FFFFFF" />}
        onPress={handleConfirm}
        disabled={!fileUri}
      />
    </View>
  );
}
