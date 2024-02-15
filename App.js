import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import UserInput from "./userInput"
import { createTable } from "./saveNote"
import { useEffect, useState } from 'react';


export default function App() {

  useEffect(()=> {
    createTable()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Write something you want saved in the database:</Text>
      <UserInput/>
      <Button 
        //onPress={onPressLearnMore}
        title="Save On Database"
        color="#841584"
        accessibilityLabel="Button to save on database"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
