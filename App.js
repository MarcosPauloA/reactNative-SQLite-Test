import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

export default function App() {

  // First open the database
  const db = SQLite.openDatabase("NameOfDatabase.db")

  // Then create a table if not exists
  function createTable(){
    db.transaction((transaction) => {
      transaction.executeSql(
        "CREATE TABLE IF NOT EXISTS " + "UserNotes " + "(id INTEGER PRIMARY KEY AUTOINCREMENT, inputSaved TEXT);")
    })
  }        

  // This is to get all from the table UserNotes
  async function searchSavedNotes(){
    return new Promise((resolve) => {
      db.transaction((transaction) => {
        transaction.executeSql("SELECT * FROM UserNotes;", [], (transaction, results) => {
          resolve(results.rows._array)
        })
      })
    })
  }

  async function showNotes(){
    const notes = await searchSavedNotes()
    console.log(notes)
  }

  // And this is to add a new note to database
  async function addNote(note){
    return new Promise((resolve) => {
      db.transaction((transaction) => {
        transaction.executeSql  ("INSERT INTO UserNotes (inputSaved) VALUES (?);", [note], () => {
          resolve("Noted Added Successfully!")
        })
      })
    })
  }

  useEffect(() => {
    createTable()
    showNotes()
  }, [])

  const [userText, onChangeText] = useState('Write Here');
  return <>
    <View style={styles.container}>
      <Text>Write something you want saved in the database:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={userText}
      />
      <Button 
        onPress={() => addNote(userText)}
        title="Save On Database"
        color="#841584"
        accessibilityLabel="Button to save on database"
      />
      <Button 
        onPress={showNotes}
        title="Show Database On Log"
        color="#841584"
        accessibilityLabel="Button to see database values"
      />
    </View>
</>
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

