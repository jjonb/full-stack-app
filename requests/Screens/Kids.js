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
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Linking } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function Kids() {
  let [fontsLoaded] = useFonts({
    RegularR: require("../assets/fonts/NunitoSans-Regular.ttf"),
    ItalicR: require("../assets/fonts/NunitoSans-Italic.ttf"),
    BoldR: require("../assets/fonts/NunitoSans-Bold.ttf"),
  });

  const [articles, setArticles] = useState([]);
  const [text, onChangeText] = useState("");

  let UrlString = "localhost";

  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }

  const searchFunction = () => {
    if (text === "") {
      return;
    }
    (async () => {
      try {
        const newsResponse = await axios.get(
          `http://${UrlString}:5050/news?q=${text}`
        );
        setArticles(newsResponse.data.slice(0, 4));
      } catch (err) {
        console.log(err);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        const newsResponse = await axios.get(
          `http://${UrlString}:5050/news/?q=babies`
        );
        setArticles(newsResponse.data.slice(0, 4));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY

  const parseContent = (content) => {
    let index = 0;
    if (content === null) {
      return "";
    }
    for (let i = 0; i < content.length; i++) {
      if (content[i] === "[") {
        index = i;
        break;
      }
    }
    return content.slice(0, index);
  };
  const navLink = (url) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navLink(item.url)}>
      <View style={styles.articleContainer}>
        <View>
          {/* {" "} */}
          {/* style={styles.imageContainer} */}
          <Image
            style={{
              width: 147,
              height: 170,
              borderBottomLeftRadius: 10,
              borderTopLeftRadius: 10,
            }}
            source={{
              uri: item.urlToImage,
            }}
          />
        </View>
        {/* Content Box */}
        <View
          style={{
            width: 230,
            height: 170,
            marginLeft: 8,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "BoldR",
              marginBottom: 10,
              paddingTop: 10,
            }}
          >
            {item.title.slice(0, 20) + "..."}
          </Text>
          <Text style={{ width: 200 }}>
            Author: {item.author != null ? item.author : item.source.name}
          </Text>
          <Text style={{ fontSize: 18 }}>
            {parseContent(item.content).slice(0, 50) + "..."}
          </Text>
          <TouchableOpacity onPress={() => navLink(item.url)}>
            <Text style={{ fontSize: 12, color: "blue" }}>Read More</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="dark" />
      </View>
    </TouchableOpacity>
  );
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              width: 360,
              height: 44,
              padding: 4,
              paddingLeft: 24,
              borderRadius: 10,
              marginBottom: 20,
              marginTop: 20,
              backgroundColor: "white",
              fontSize: 18,
            }}
            onChangeText={onChangeText}
            value={text}
            onSubmitEditing={searchFunction}
            placeholder="Search"
          />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffe0",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  //Parent Container
  articleContainer: {
    height: 170,
    width: 380,
    // borderWidth: 1,
    // borderColor: "#d9d8d4",
    backgroundColor: "#F9F6EF",
    flexDirection: "row",
    borderRadius: 10,
    // marginLeft: 20,
    // marginRight: 20,
    marginBottom: 20,
    // shadowColor: "black",
    shadowOffset: { width: -7, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // zIndex: 90,
    elevation: 20,
  },
});
