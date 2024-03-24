import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "./src/config/firebase"
import CreateUser from "./src/components/CreateUser"
import DeleteUser from "./src/components/DeleteUser"

export default function App() {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const usersQuery = collection(db, "users")
    onSnapshot(usersQuery, (snapshot) => {//watches whenever there is change in the database..  when there is..
      let usersList = []// make an empty list but whenever there is something in data base add.
      snapshot.docs.map((doc) => usersList.push({ ...doc.data(), id: doc.id }))//push the data into users list. Also giving each doc.data a id.
      // ...doc.data() spreads out the data into seperate things and gives it id.
      setPeople(usersList)
      setLoading(false)
    })
  }, [])

  const renderItem = ({ item }) => (
    <View style={{ marginTop: 10 }}>
      <Text>{item.username}</Text>
      <DeleteUser id={item.id} />
    </View>
  )

  return (
    <View style={styles.container}>
      <Text>Firebase Example</Text>
      <CreateUser />
      <FlatList
        data={people}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
})