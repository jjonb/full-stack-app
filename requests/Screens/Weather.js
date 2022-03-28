import React, { useRef, useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import axios from "axios";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let UrlString = "localhost";

  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }
  useEffect(() => {
    (async () => {
      try {
        const weatherResponse = await axios.get(
          `http://${UrlString}:5050/weather`
        );
        setWeather(weatherResponse.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/day.jpg")}
        resizeMode="cover"
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 40, color: "white" }}>San Jose, CA</Text>
        <View
          style={{
            borderRadius: 150,
            backgroundColor: "#0199e5",
            shadowColor: "#000",
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowOpacity: 1,
            shadowRadius: 1,
            elevation: 3,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 300,
              padding: 0,
              paddingBottom: 20,
              borderRadius: 150,
              height: 300,
            }}
          >
            <Image
              style={{ width: 200, height: 200 }}
              source={require("../assets/sunny_cloudy.png")}
            />
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                🌡 {Math.round(weather.main.temp)}° F
              </Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Weather;
