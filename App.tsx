import React from 'react';
import { Button } from '@react-navigation/elements';
import {  NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
} from 'react-native';
import Pagination from './src/screens/pagination';
import FileExplorer from './src/screens/fileexplorer';
import TransactinList from './src/screens/TransactionList';
import AddExpense from './src/screens/AddExpense';
import { TransactionsProvider } from './src/context/TransactionData';
import ProductsPage from './src/screens/Shopping/ProductsPage';
import Cart from './src/screens/Shopping/Cart';
import { CartContextProvider } from './src/context/CartContext';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <Button onPress={() => navigation.navigate('Pagination')}>
        Go to Pagination
      </Button>
      <Button onPress={() => navigation.navigate('FileExplorer')}>
        Go to File Explorer
      </Button>
      <Button onPress={() => navigation.navigate('TransactionHome')}>
        Go to Expense Tracker
      </Button>
      <Button onPress={() => navigation.navigate('Products')}>
        Go to Shopping App
      </Button>
    </View>
  );
}



const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return <NavigationContainer>
      <TransactionsProvider>
        <CartContextProvider>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} options={{'title': 'Home'}}/>
          <Stack.Screen name='Pagination' component={Pagination} options={{'title': 'Pagination'}}/>
          <Stack.Screen name='FileExplorer' component={FileExplorer} options={{'title': 'File Explorer'}}/>
          <Stack.Screen name="TransactionHome" component={TransactinList} options={{title: 'Transactions'}}/>
          <Stack.Screen name="AddExpense" component={AddExpense} options={{title:'Add Expense'}}/>
          <Stack.Screen name="Products" component={ProductsPage} options={{title: 'Products List'}} />
          <Stack.Screen name="Cart" component={Cart} options={{title: 'Cart'}} />
        </Stack.Navigator>
        </CartContextProvider>
        </TransactionsProvider>
    </NavigationContainer>;
}

export default App;
