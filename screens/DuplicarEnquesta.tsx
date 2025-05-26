import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { EnquestesContext } from './context/EnquestesContext';


export default function DuplicarEnquesta({ navigation }: any) {
  const { enquestes, duplicarEnquesta } = useContext(EnquestesContext);

  const duplicar = (id: string) => {
    Alert.alert(
      'Duplicar Enquesta',
      'Segur que vols duplicar aquesta enquesta?',
      [
        { text: 'Cancel·lar', style: 'cancel' },
        {
          text: 'Sí',
          onPress: () => {
            duplicarEnquesta(id);
            Alert.alert('Correcte', 'Enquesta duplicada correctament');
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Duplicar Enquesta</Text>

      <FlatList
        data={enquestes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.enquesta} onPress={() => duplicar(item.id)}>
            <Text style={styles.enquestaText}>{item.titol}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hi ha enquestes per duplicar</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, color: '#333' },
  enquesta: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#2196f3',
  },
  enquestaText: { color: 'white', fontSize: 18 },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' },
});

