import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { logUserOut } from "../apollo";

export default function Search({ navigation }) {
    return (
        <View 
            style={{ 
                backgroundColor: "black", 
                flex: 1, 
                alignItems: "center", 
                justifyContent: "center"
            }}
        >
            <TouchableOpacity onPress={ () =>  navigation.navigate("Photo")
            }
            >
                <Text style={{ color: "white" }}>Photo</Text>
            </TouchableOpacity>
            
        </View>
    );
}