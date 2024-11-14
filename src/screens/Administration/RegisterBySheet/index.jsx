import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as Papa from "papaparse";
import styles from "../../../constants/defaultStyles";
import { signUpWithEmail } from "../../../../database/auth/register";

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
      console.log("Arquivo selecionado:", result.assets[0].name, result.assets[0].uri); // Depuração
    } else {
      setFileName(null);
      setFileUri(null);
      console.log("Nenhum arquivo selecionado"); // Depuração
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
              console.log(user);
              
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

  return (
    <View style={styles.container}>
      <Button
        title="Selecionar Arquivo (CSV ou Excel)"
        onPress={pickDocument}
      />
      {fileName && (
        <Text style={{ marginVertical: 20 }}>
          Arquivo selecionado: {fileName}
        </Text>
      )}
      <Button
        title="Confirmar"
        onPress={handleConfirm}
        disabled={!fileUri} // Habilite o botão apenas quando o fileUri for válido
      />
    </View>
  );
}
