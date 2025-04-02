import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { useCartActionContext, useCartDataContext } from "../../context/CartContext";

const Cart = () => {
    const {items, total} = useCartDataContext();
    const {deleteItem} = useCartActionContext();

    const renderItem = ({item}) => {
        return <View style={styles.container}>
            <Image source={{uri: item.image}} style={styles.image} />
            <View style={styles.rightContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.bottomRow}>
                    <Text style={styles.title}>${item.price}</Text>
                    <Pressable style={styles.button} onPress={() => deleteItem(item.id)}>
                        <Text style={styles.buttonText}>Remove</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    }

    if(items.length == 0) {
        return <Text style={styles.emptyCartText}>Cart is Empty</Text>
    }

    return <SafeAreaView>
        <Text style={styles.emptyCartText}>Total: ${total}</Text>
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    emptyCartText: {
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center'
    },
    container: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5
    },
    image: {
        width: 100,
        height: 100
    },
    title: {
        fontWeight: 'bold',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20
    },
    buttonText: {
        color: '#fff'
    }
});

export default Cart;