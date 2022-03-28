import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import News from "./Screens/News";
import Weather from "./Screens/Weather";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="News"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: "tomato" }}
      >
        <Tab.Screen
          name="News"
          component={News}
          options={{
            tabBarLabel: "News",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="newspaper" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Weather"
          component={Weather}
          options={{
            tabBarLabel: "Weather",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="weather-cloudy"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
