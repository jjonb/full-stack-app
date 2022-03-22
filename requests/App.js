import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [text, onChangeText] = useState("");
  const [weather, setWeather] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const searchFunction = () => {
    (async () => {
      try {
        const newsResponse = await axios.get(
          `http://localhost:5050/news?q=${text}`
        );
        setArticles(newsResponse.data);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        const newsResponse = await axios.get("http://localhost:5050/news/top");
        setArticles(newsResponse.data);
      } catch (err) {
        console.log(err);
      }
    })();
    (async () => {
      try {
        const weatherResponse = await axios.get(
          "http://localhost:5050/weather"
        );
        setWeather(weatherResponse.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY

  const renderItem = ({ item }) => (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>{item.title}</Text>
      <Text>Author: {item.author}</Text>
      <Image
        style={{
          width: 100 + "%",
          height: 200,
          resizeMode: "contain",
        }}
        source={{
          uri: item.urlToImage,
        }}
      />
      <Text style={{ fontSize: 25, fontFamily: "Cochin" }}>{item.content}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={{ borderWidth: 1 }}
          onChangeText={onChangeText}
          value={text}
        />
        <TouchableOpacity onPress={searchFunction}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={{ fontSize: 30, color: "black" }}>
            {weather.main.temp} F
          </Text>
        )}
      </View>

      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, num) => num}
      />
      {/* <Text>{articles[0] ? articles[0].source.id : "Loading"}</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
