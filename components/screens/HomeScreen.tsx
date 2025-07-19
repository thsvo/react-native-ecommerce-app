import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
}

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/static/products', {
          headers: {
            Authorization: 'Bearer haomao123',
          },
        });
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <View className="flex-1 m-1 p-2 bg-white rounded-lg border border-gray-200 items-center">
      <Image source={{ uri: `http://localhost:3001${item.images[0]?.url}` }} className="w-36 h-36 mb-2" />
      <Text className="text-base font-bold text-center mb-1">{item.name}</Text>
      <Text className="text-sm text-gray-500 mb-2">৳{item.price}</Text>
      <TouchableOpacity className="bg-black py-2 px-4 rounded-md">
        <Text className="text-white font-bold">অর্ডার করুন</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 p-1 bg-white">
      <View className="flex-row justify-between items-center p-2">
        <Text className="text-lg font-bold">ALL PRODUCTS</Text>
        <Ionicons name="filter" size={24} color="black" />
      </View>
      <View className="flex-row p-2">
        <TextInput className="flex-1 border border-gray-300 rounded-md px-2" placeholder="Search" />
        <TouchableOpacity className="bg-orange-500 p-2 rounded-md ml-2">
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="bg-sky-500 p-2 rounded-md m-2 self-start">
        <Text className="text-white font-bold">Cats:</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

export default HomeScreen;
