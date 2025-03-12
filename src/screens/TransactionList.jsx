import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView, Pressable } from "react-native";
import DropDown from "../components/Dropdown";
import { categories } from "../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TransactionContext } from "../context/TransactionData";


const ExpenseCard = ({item}) => {

    const formatDate = (val) => {

        let date = new Date(val);

        let dd = date.getDay() < 10 ? '0'+date.getDay() : date.getDay();
        let mm = date.getMonth();
        let month = Number(mm)+1;
        mm = month < 10 ? '0'+month : month
        let y = date.getFullYear();

        return `${dd}-${mm}-${y}`;
    }

    return <View style={styles.cardcontainer}>
        <Text>{formatDate(item.date)}</Text>
        <Text>{item.category}</Text>
        <Text>{item.amount}</Text>
        <Text>{item.type}</Text>
    </View>
}

const TransactinList = () => {
    const navigation = useNavigation();
    const [category, setCategory] = useState('');
    const {transactions, setTransactions} = useContext(TransactionContext);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            let data = await AsyncStorage.getItem('transactions');
            let decoded = data ? JSON.parse(data) : [];

            setTransactions(decoded);
        } catch (error) {
            console.log(error);
        }
    }

    const addExpenseClick = () => {
        navigation.navigate('AddExpense')
    };

    const updateFilter = (val) => setCategory(val);

    const resetFilter = () => setCategory('');

    const totalIncome = transactions
                        .filter(v => category ? v.category == category && v.type == 'Income' : v.type == 'Income')
                        .reduce((v, s) => v + Number(s.amount), 0);
    const totalExpense = transactions
                        .filter(v => category ? v.category == category && v.type == 'Expense' : v.type == 'Expense')
                        .reduce((v, s) => v + Number(s.amount), 0);
    const totalBalance = totalIncome - totalExpense;

    return <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
                    <Text>Filter By:</Text>
                    <Pressable onPress={resetFilter}><Text>Reset</Text></Pressable>
                </View>
                <DropDown options={categories} selected={category} onSelect={updateFilter}  />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
                <Text>Total Balance: {totalBalance}</Text>
                <Text>Total Income: {totalIncome}</Text>
                <Text>Total Expense: {totalExpense}</Text>
            </View>
            <View style={{flexGrow: 1, flex: 1}}>
                {
                    transactions.length == 0 ? <Text style={styles.notransactionstext}>No Transactions found</Text> :
                    <FlatList
                        data={category ? transactions.filter(v => v.category == category) : transactions}
                        renderItem={({item}) => <ExpenseCard item={item} />}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                }
            </View>
            <View style={styles.footer}>
                <Button onPress={addExpenseClick}>Add Expense</Button>
            </View>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    notransactionstext: {
        textAlign: 'center',
        marginTop: 20
    },
    footer: {
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 10,
        alignItems: 'center',
    },
    cardcontainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        padding: 20
    }
});

export default TransactinList;