import { useState, useContext } from "react";
import { View, StyleSheet, TextInput, Text, Alert, Pressable } from "react-native";
import { categories, incomeTypes } from "../utils/constants";
import { Button } from "@react-navigation/elements";
import DropDown from "../components/Dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { TransactionContext } from "../context/TransactionData";


const AddExpense = () => {
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('Food');
    const [incomeType, setIncomeType] = useState('Income');
    const {transactions, setTransactions} = useContext(TransactionContext);
    const navigation = useNavigation();

    const onCategorySelect = (val) => {
        setCategory(val);
    }

    const onIncomeTypeSelect = (val) => {
        setIncomeType(val)
    }

    const handleTextChange = (val) => setAmount(val);

    const saveClick = async () => {

        let data = {
            id: Date.now().toString(),
            amount,
            category,
            type: incomeType,
            date: Date.now()
        }

        let updatedExpenses = [...transactions, data];

        await AsyncStorage.setItem('transactions', JSON.stringify(updatedExpenses));
        setTransactions(updatedExpenses);
        navigation.goBack();
    }

    return <View style={styles.container}>
        <TextInput style={styles.input} value={amount} placeholder="Add amount" onChangeText={handleTextChange} keyboardType="numeric" />
        <DropDown options={categories} selected={category} onSelect={onCategorySelect} />
        <DropDown options={incomeTypes} selected={incomeType} onSelect={onIncomeTypeSelect} />
        <Button disabled={!amount || !category || !incomeType} onPress={saveClick}>Save</Button>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 10
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5
    }
});
export default AddExpense;