import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const newsResponse = await axios.get(
          "http://localhost:5050/api?q=Pandas"
        );
        setArticles(newsResponse.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.title}</Text>
      <Text>Author: {item.author}</Text>
      <Image
        style={{
          width: 500,
          height: 500,
        }}
        source={{
          uri: item.urlToImage,
        }}
      />
      <Text>{item.content}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
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
