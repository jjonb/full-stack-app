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
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [text, onChangeText] = useState("");
  const [weather, setWeather] = useState([]);
  const [isLoading, setLoading] = useState(true);

  let UrlString = "localhost";

  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }

  const searchFunction = () => {
    (async () => {
      try {
        const newsResponse = await axios.get(
          `http://${UrlString}:5050/news?q=${text}`
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
        const newsResponse = await axios.get(
          `http://${UrlString}:5050/news/top`
        );
        setArticles(newsResponse.data);
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
      <Text style={{ fontSize: 25 }}>{item.content}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={{ borderWidth: 1, marginTop: 100 }}
          onChangeText={onChangeText}
          value={text}
          onSubmitEditing={searchFunction}
        />
        <TouchableOpacity onPress={searchFunction}>
          <Text>Search</Text>
        </TouchableOpacity>
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
    padding: 10,
  },
});
