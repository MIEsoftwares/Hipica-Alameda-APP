import { Pressable, Text, StyleSheet } from "react-native";

export default function DefButton(props){
    return (
        <Pressable 
            onPress={props.onPress} 
            style={[styles.default, props.style]}
        >
            <Text style={[styles.text, props.labelStyle]}>
                {props.children || "Button"}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    default:{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
        paddingVertical: 8,
        backgroundColor: "#0000ff",
        borderRadius: 50,
        flexShrink: 1,
        alignSelf: "flex-start"
    },
    text: {
        color: "#ffffff"
    }
})