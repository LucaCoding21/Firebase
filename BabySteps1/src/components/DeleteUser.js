import React from "react"
import { Text, View, Pressable } from "react-native"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../config/firebase"

export default function DeleteUser({ id }) {
  function deleteUser() {
    const user = doc(db, "users", id)
    deleteDoc(user)
  }

  return (
    <View>
      <Pressable onPress={deleteUser}>
        <Text>X</Text>
      </Pressable>
    </View>
  )
}