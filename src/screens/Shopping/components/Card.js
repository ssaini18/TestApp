import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Card = ({id, title, image, price, onPress}) => {

    const onPressHandle = () => {
        onPress({id, title, image, price});
    }

    return <View style={styles.container}>
        <Image source={{uri: image}} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.bottomRow}>
            <Text style={styles.priceText}>${price}</Text>
            <Pressable onPress={onPressHandle} style={styles.button}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </Pressable>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        width: '48%',
        margin: '1%',
        borderRadius: 5,
        justifyContent: 'space-between'
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bottomRow: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white'
    },
    priceText: {
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20
    }
});

export default Card;