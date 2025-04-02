import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Card from "./components/Card";
import { useNavigation } from "@react-navigation/native";
import { useCartActionContext } from "../../context/CartContext";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const {addItem} = useCartActionContext();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count
        navigation.setOptions({
          headerRight: () => (
            <Pressable style={styles.cartBtn} onPress={() => navigation.navigate("Cart")}>
                <Text style={styles.headerBtnText}>Cart</Text>
            </Pressable>
          ),
        });
      }, [navigation]);

    const fetchData = async () => {
        try {
            setLoading(true);
            let res = await fetch('https://dummyjson.com/products');
            let data = await res.json();

            setProducts(data.products);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const addToCart = (item) => {
        addItem(item);
    }

    if(loading) {
        return <View style={styles.loaderContainer}>
            <ActivityIndicator />
        </View>
    }

    return <SafeAreaView>
        <FlatList
            numColumns={2}
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => <Card id={item.id} title={item.title} image={item.thumbnail} price={item.price} onPress={addToCart} />}
        />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent:'center'
    },
    cartBtn: {
        marginLeft: 100
    },
    headerBtnText: {
        color: '#007AFF',
    }
});

export default ProductsPage;