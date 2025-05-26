import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { EnquestesContext } from './context/EnquestesContext';


export default function RespondreEnquesta({ route, navigation }: any) {
  const { id } = route.params;
  const { enquestes, respondreEnquesta } = useContext(EnquestesContext);

  const enquesta = enquestes.find((e) => e.id === id);
  const [respostes, setRespostes] = useState<{ [key: string]: string }>({});

  if (!enquesta) return <Text>Enquesta no trobada</Text>;

  const seleccionarResposta = (pregunta: string, opcio: string) => {
    setRespostes((prev) => ({ ...prev, [pregunta]: opcio }));
  };

  const enviarRespostes = () => {
    if (Object.keys(respostes).length !== enquesta.preguntes.length) {
      Alert.alert('Error', 'Cal respondre totes les preguntes');
      return;
    }
    respondreEnquesta(id, respostes);
    Alert.alert('Correcte', 'Respostes enviades', [
      { text: 'Ok', onPress: () => navigation.navigate('Home') },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{enquesta.titol}</Text>

      {enquesta.preguntes.map((p, i) => (
        <View key={i} style={styles.preguntaContainer}>
          <Text style={styles.pregunta}>{p.pregunta}</Text>
          {p.opcions.map((o, j) => {
            const seleccionat = respostes[p.pregunta] === o;
            return (
              <TouchableOpacity
                key={j}
                style={[styles.opcio, seleccionat && styles.opcioSeleccionat]}
                onPress={() => seleccionarResposta(p.pregunta, o)}
              >
                <Text style={seleccionat ? styles.opcioTextSeleccionat : styles.opcioText}>{o}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={enviarRespostes}>
        <Text style={styles.submitText}>Enviar Respostes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 16, color: '#333' },
  preguntaContainer: { marginBottom: 20 },
  pregunta: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  opcio: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  opcioSeleccionat: {
    backgroundColor: '#2196f3',
    borderColor: '#2196f3',
  },
  opcioText: { color: '#333' },
  opcioTextSeleccionat: { color: 'white' },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

