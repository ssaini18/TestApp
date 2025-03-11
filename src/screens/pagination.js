import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, Pressable } from "react-native";
import ProductCard from "../components/productCard";

const Pagination = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            let resp = await fetch("https://dummyjson.com/products?limit=500");
            let data = await resp.json();

            setProducts(data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <View style={styles.center}>
            <ActivityIndicator />
        </View>
    }

    const renderItem = ({item, index}) => {
        return <Pressable 
                style={[styles.pageBtn, { backgroundColor:page == index + 1 ? 'grey' : 'lightgrey'}]} 
                onPress={() => setPage(index + 1)}
            >
            <Text>{index+1}</Text>
        </Pressable>
    }

    const numPages = Math.ceil(products.length/10);
    const start = (page-1)*10;
    const end = start + 10;

    return <SafeAreaView style={styles.flexOne}>
        {
            products.length == 0 ? <View style={styles.center}><Text>No Products found</Text></View>
                : 
                <View style={styles.flexOne}>
                    <View>
                        <FlatList
                            horizontal
                            data={Array(numPages)}
                            keyExtractor={(item, i) => i.toString()}
                            renderItem={renderItem}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{marginHorizontal: 5,}}
                        />
                    </View>
                    <View style={styles.flexOne}>
                        <FlatList 
                            data={products.slice(start, end)} 
                            keyExtractor={item => item.id} 
                            renderItem={({ item }) => <ProductCard title={item.title} image={item.thumbnail} />}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
        }
    </SafeAreaView>
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageBtn: {
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 1,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexOne: {
        flex: 1,
    }
});

export default Pagination;