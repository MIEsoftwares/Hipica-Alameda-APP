import { Pressable, Text, StyleSheet } from "react-native";

export default function DefButton(props){
    return (
        <Pressable
            disabled={props.disabled} 
            onPress={props.onPress} 
            style={props.disabled ? [styles.default, props.style, {backgroundColor: "#dfdfdf"}] : [styles.default, props.style]}
        >
            { props.children && <Text style={props.disabled? [styles.text, props.labelStyle, {color: "#a8a8a8"}] : [styles.text, props.labelStyle]}>
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