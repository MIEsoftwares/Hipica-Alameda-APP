import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import styles from "../../../constants/defaultStyles";
import { signUpWithEmail } from "../../../../database/auth/register";

export default function RegisterBySheet() {
    const [fileName, setFileName] = useState(null);

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
            copyToCacheDirectory: true,
        });

        if (result.type === "success") {
            setFileName(result.name);
        } else {
            setFileName(null);
        }
    };

    const handleConfirm = () => {
        if (fileName) {
            signUpWithEmail("email@example.com", "password", "name", "cpf", "phone", true, "horseName", "role")
                .then(() => Alert.alert("Sucesso", "Usuários registrados com sucesso!"))
                .catch((error) => Alert.alert("Erro", error.message));
        } else {
            Alert.alert("Erro", "Nenhum arquivo selecionado.");
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Selecionar Arquivo (CSV ou Excel)" onPress={pickDocument} />
            {fileName && <Text style={{ marginVertical: 20 }}>Arquivo selecionado: {fileName}</Text>}
            <Button title="Confirmar" onPress={handleConfirm} disabled={!fileName} />
        </View>
    );
}
