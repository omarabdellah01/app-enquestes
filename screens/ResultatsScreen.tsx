import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { EnquestesContext } from './context/EnquestesContext';


export default function ResultatsScreen() {
  const { enquestes } = useContext(EnquestesContext);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resultats de les Enquestes</Text>

      {enquestes.length === 0 && <Text>No hi ha enquestes per mostrar.</Text>}

      {enquestes.map((enquesta) => (
        <View key={enquesta.id} style={styles.enquestaContainer}>
          <Text style={styles.enquestaTitle}>{enquesta.titol}</Text>
          {enquesta.preguntes.map((p, i) => {
            // Comptar respostes per opcio
            const counts = p.opcions.reduce<Record<string, number>>((acc, opcio) => {
              acc[opcio] = 0;
              return acc;
            }, {});

            for (const resposta of enquesta.respostes) {
              const opcio = resposta[p.pregunta];
              if (opcio && counts[opcio] !== undefined) {
                counts[opcio]++;
              }
            }

            return (
              <View key={i} style={styles.preguntaContainer}>
                <Text style={styles.pregunta}>{p.pregunta}</Text>
                {p.opcions.map((opcio, j) => (
                  <Text key={j} style={styles.opcio}>
                    {opcio}: {counts[opcio]} respostes
                  </Text>
                ))}
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, color: '#333' },
  enquestaContainer: {
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  enquestaTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  preguntaContainer: { marginBottom: 12 },
  pregunta: { fontSize: 18, fontWeight: '600' },
  opcio: { marginLeft: 16, fontSize: 16 },
});

