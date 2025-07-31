import { Text, StyleSheet } from "react-native";

export default function TituloHeader({ title, fontSize = 26, color = '#1E90FF' }) {
    return (
        <Text style={[styles.textHeader, { fontSize, color }]}>{title}</Text>
    );
}

const styles = StyleSheet.create({
    textHeader: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
