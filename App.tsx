import { Button } from '@react-navigation/elements';
import { createStaticNavigation, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Pagination from './src/screens/pagination';
import FileExplorer from './src/screens/fileexplorer';
import TransactinList from './src/screens/TransactionList';
import AddExpense from './src/screens/AddExpense';

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
    </View>
  );
}



const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{'title': 'Home'}}/>
      <Stack.Screen name='Pagination' component={Pagination} options={{'title': 'Pagination'}}/>
      <Stack.Screen name='FileExplorer' component={FileExplorer} options={{'title': 'File Explorer'}}/>
      <Stack.Screen name="TransactionHome" component={TransactinList} options={{title: 'Transactions'}}/>
      <Stack.Screen name="AddExpense" component={AddExpense} options={{title:'Add Expense'}}/>
    </Stack.Navigator>
  </NavigationContainer>;
}

const styles = StyleSheet.create({
  
});

export default App;
