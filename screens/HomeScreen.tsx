import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { EnquestesContext } from './context/EnquestesContext';

export default function HomeScreen({ navigation }: any) {
  const { enquestes, desferAccio, eliminarEnquesta } = useContext(EnquestesContext);

  const confirmarEliminacio = (id: string) => {
    Alert.alert(
      'Eliminar enquesta',
      'Estàs segur que vols eliminar aquesta enquesta?',
      [
        { text: 'Cancel·lar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => eliminarEnquesta(id), style: 'destructive' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enquestes</Text>

      <FlatList
        data={enquestes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.enquesta}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => navigation.navigate('RespondreEnquesta', { id: item.id })}
            >
              <Text style={styles.enquestaText}>{item.titol}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => confirmarEliminacio(item.id)}
              style={styles.eliminarBtn}
            >
              <Text style={styles.eliminarText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hi ha enquestes creades</Text>}
      />

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CrearEnquesta')}
        >
          <Text style={styles.buttonText}>Crear Enquesta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DuplicarEnquesta')}
        >
          <Text style={styles.buttonText}>Duplicar Enquesta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#f44336' }]}
          onPress={() => {
            Alert.alert(
              'Desfer',
              'Vols desfer l\'última acció?',
              [
                { text: 'Cancel·lar', style: 'cancel' },
                { text: 'Sí', onPress: desferAccio },
              ]
            );
          }}
        >
          <Text style={styles.buttonText}>Desfer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ResultatsScreen')}
        >
          <Text style={styles.buttonText}>Veure Resultats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  enquesta: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#4caf50',
  },
  enquestaText: { color: 'white', fontSize: 18 },
  eliminarBtn: {
    marginLeft: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#e53935',
    borderRadius: 4,
  },
  eliminarText: {
    color: 'white',
    fontSize: 16,
  },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' },
  buttons: { marginTop: 16 },
  button: {
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});



