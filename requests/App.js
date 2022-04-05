import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import News from "./Screens/News";
import Weather from "./Screens/Weather";
import Kids from "./Screens/Kids";
import Health from "./Screens/Health";
import Sports from "./Screens/Sports";

const Tab = createBottomTabNavigator();
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
            headerShown: false,
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
            headerShown: false,
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
        <Tab.Screen
          name="Sports"
          component={Sports}
          options={{
            headerShown: false,
            tabBarLabel: "Sports",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="soccer-ball-o" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Health"
          component={Health}
          options={{
            headerShown: false,
            tabBarLabel: "Health",
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-fitness" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Kids"
          component={Kids}
          options={{
            headerShown: false,
            tabBarLabel: "Kids",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="child" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
