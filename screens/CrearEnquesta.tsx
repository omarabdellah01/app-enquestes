import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { EnquestesContext } from './context/EnquestesContext';

import { Pregunta } from '../types';

export default function CrearEnquesta({ navigation }: any) {
  const { crearEnquesta } = useContext(EnquestesContext);

  const [titol, setTitol] = useState('');
  const [preguntes, setPreguntes] = useState<Pregunta[]>([
    { pregunta: '', opcions: ['', ''] },
  ]);

  const afegirPregunta = () => {
    setPreguntes([...preguntes, { pregunta: '', opcions: ['', ''] }]);
  };

  const canviarPregunta = (index: number, text: string) => {
    const nova = [...preguntes];
    nova[index].pregunta = text;
    setPreguntes(nova);
  };

  const afegirOpcio = (index: number) => {
    const nova = [...preguntes];
    nova[index].opcions.push('');
    setPreguntes(nova);
  };

  const canviarOpcio = (pIndex: number, oIndex: number, text: string) => {
    const nova = [...preguntes];
    nova[pIndex].opcions[oIndex] = text;
    setPreguntes(nova);
  };

  const validarICrear = () => {
    if (!titol.trim()) {
      Alert.alert('Error', 'El títol no pot estar buit');
      return;
    }
    for (const p of preguntes) {
      if (!p.pregunta.trim()) {
        Alert.alert('Error', 'Totes les preguntes han de tenir text');
        return;
      }
      if (p.opcions.length < 2) {
        Alert.alert('Error', 'Cada pregunta ha de tenir almenys 2 opcions');
        return;
      }
      for (const o of p.opcions) {
        if (!o.trim()) {
          Alert.alert('Error', 'Les opcions no poden estar buides');
          return;
        }
      }
    }
    crearEnquesta(titol, preguntes);
    Alert.alert('Correcte', 'Enquesta creada correctament', [
      { text: 'Ok', onPress: () => navigation.navigate('Home') },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Títol de l'enquesta</Text>
      <TextInput
        style={styles.input}
        value={titol}
        onChangeText={setTitol}
        placeholder="Escriu el títol"
      />

      {preguntes.map((p, pIndex) => (
        <View key={pIndex} style={styles.preguntaContainer}>
          <Text style={styles.label}>Pregunta {pIndex + 1}</Text>
          <TextInput
            style={styles.input}
            value={p.pregunta}
            onChangeText={(text) => canviarPregunta(pIndex, text)}
            placeholder="Escriu la pregunta"
          />

          {p.opcions.map((o, oIndex) => (
            <TextInput
              key={oIndex}
              style={styles.input}
              value={o}
              onChangeText={(text) => canviarOpcio(pIndex, oIndex, text)}
              placeholder={`Opció ${oIndex + 1}`}
            />
          ))}

          <TouchableOpacity style={styles.addOptionButton} onPress={() => afegirOpcio(pIndex)}>
            <Text style={styles.addOptionText}>+ Afegir opció</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addQuestionButton} onPress={afegirPregunta}>
        <Text style={styles.addQuestionText}>+ Afegir pregunta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={validarICrear}>
        <Text style={styles.submitText}>Crear Enquesta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', fontSize: 16, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 6,
  },
  preguntaContainer: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addOptionButton: {
    marginTop: 8,
  },
  addOptionText: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
  addQuestionButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  addQuestionText: {
    fontSize: 18,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#2196f3',
    padding: 16,
    marginTop: 32,
    borderRadius: 10,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

