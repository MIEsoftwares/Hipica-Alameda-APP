import { Pressable, Text, StyleSheet } from "react-native";

export default function DefButton(props){
    return (
        <Pressable 
            onPress={props.onPress} 
            style={[styles.default, props.style]}
        >
            { props.children && <Text style={[styles.text, props.labelStyle]}>
                {props.children}
            </Text>}
            {props.icon}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    default:{
        minHeight: 43,
        minWidth: 111.2,
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