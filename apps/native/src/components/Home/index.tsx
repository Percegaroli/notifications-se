import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import {
  registerBackgroundFetch,
  unregisterBackgroundFetch,
} from "../../config/backgroundPolling";
import { UserSingleton } from "../../singletons/UserSingleton";
import { styles } from "./styles";

const Home = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState(UserSingleton.getInstance().getEmail());

  const onChangeEmail = (email: string) => {
    setEmail(email);
    UserSingleton.getInstance().setEmail(email);
  };

  const onButtonPress = async () => {
    if (isRegistered) {
      setIsRegistered(false);
      unregisterBackgroundFetch();
    } else if (email) {
      try {
        await registerBackgroundFetch();
        setIsRegistered(true);
      } catch {}
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text>Email:</Text>
        <TextInput
          onChangeText={onChangeEmail}
          editable={!isRegistered}
          style={styles.input}
        />
      </View>

      <Pressable
        onPress={onButtonPress}
        style={{
          ...styles.button,
          ...(isRegistered ? styles.buttonDesconect : styles.buttonConnect),
        }}
      >
        <Text>{isRegistered ? "Desconectar" : "Conectar"}</Text>
      </Pressable>
    </View>
  );
};

export default Home;
