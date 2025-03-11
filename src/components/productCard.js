import { Image, StyleSheet, Text, View } from "react-native";

const ProductCard = ({image, title}) => {
    return <View style={styles.container}>
        <Image source={{uri: image	}} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: '48%',
        margin: '1%',
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    image: {
        width: 100,
        height: 100,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default ProductCard;