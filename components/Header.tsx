import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  return (
    <View className="flex-row justify-between items-center px-4 py-2 bg-orange-500">
      <TouchableOpacity>
        <Ionicons name="menu" size={32} color="black" />
      </TouchableOpacity>
      <Text className="text-xl font-bold text-white">LIVE SHOPPING</Text>
      <View className="flex-row w-14 justify-between">
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
