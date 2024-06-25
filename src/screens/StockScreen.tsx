import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type StockScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Stock'>;

type Props = {
  navigation: StockScreenNavigationProp;
};

interface StockItem {
  id: string;
  name: string;
  quantity: number;
}

const StockScreen: React.FC<Props> = ({ navigation }) => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);

  useEffect(() => {
    const initialStock: StockItem[] = [
      { id: '1', name: 'Pão', quantity: 100 },
      { id: '2', name: 'Leite', quantity: 50 },
      { id: '3', name: 'Café', quantity: 30 },
    ];
    setStockItems(initialStock);
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await Keychain.resetGenericPassword();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque</Text>
      <FlatList
        data={stockItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - {item.quantity}</Text>
          </View>
        )}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default StockScreen;
