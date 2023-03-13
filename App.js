import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([{}]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync(
    { fields: [Contacts.Fields.PhoneNumbers] }
    );
    if (data.length > 0) {
        const processedData = data.map((contact) => ({
          id: contact.id,
          name: contact.name,
          phoneNumber: contact.phoneNumbers && contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : '',
        }));
        setContacts(processedData);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
      style={{marginTop: 40, marginBottom: 20}}
      data={contacts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.contact}>
          <Text style={{marginRight: 20}}>{item.name}</Text>
          <Text>{item.phoneNumber}</Text>
        </View>
      )}
      />
      <View style={{marginBottom: 15}}>
        <Button onPress={getContacts} title="GET CONTACTS"/>
      </View>
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
  contact: {
    flexDirection: 'row',
    padding: 5,
  }
});
