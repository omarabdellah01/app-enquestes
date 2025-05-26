import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Enquesta, Pregunta, Resposta } from '../../types';
import { v4 as uuidv4 } from 'uuid';

type EnquestesContextType = {
  enquestes: Enquesta[];
  crearEnquesta: (titol: string, preguntes: Pregunta[]) => void;
  respondreEnquesta: (id: string, resposta: Resposta) => void;
  duplicarEnquesta: (id: string) => void;
  eliminarEnquesta: (id: string) => void;
  desferAccio: () => void;
};

export const EnquestesContext = createContext<EnquestesContextType>({
  enquestes: [],
  crearEnquesta: () => {},
  respondreEnquesta: () => {},
  duplicarEnquesta: () => {},
  eliminarEnquesta: () => {},
  desferAccio: () => {},
});

type Props = {
  children: ReactNode;
};

export const EnquestesProvider = ({ children }: Props) => {
  const [enquestes, setEnquestes] = useState<Enquesta[]>([]);
  const [historial, setHistorial] = useState<Enquesta[][]>([]);

  // Cargar datos al inicio
  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@enquestes');
        if (jsonValue != null) setEnquestes(JSON.parse(jsonValue));
      } catch (e) {
        console.error('Error cargando enquestes', e);
      }
    })();
  }, []);

  // Guardar datos cada vez que cambian
  useEffect(() => {
    AsyncStorage.setItem('@enquestes', JSON.stringify(enquestes));
  }, [enquestes]);

  // Guardar estado anterior
  const afegirHistorial = (nouEstat: Enquesta[]) => {
    setHistorial((h) => [...h, enquestes]);
    setEnquestes(nouEstat);
  };

  const crearEnquesta = (titol: string, preguntes: Pregunta[]) => {
    const nova: Enquesta = {
      id: uuidv4(),
      titol,
      preguntes,
      respostes: [],
    };
    afegirHistorial([...enquestes, nova]);
  };

  const respondreEnquesta = (id: string, resposta: Resposta) => {
    const nouArray = enquestes.map((enquesta) =>
      enquesta.id === id
        ? { ...enquesta, respostes: [...enquesta.respostes, resposta] }
        : enquesta
    );
    afegirHistorial(nouArray);
  };

  const duplicarEnquesta = (id: string) => {
    const original = enquestes.find((e) => e.id === id);
    if (!original) return;
    const copia: Enquesta = {
      ...original,
      id: uuidv4(),
      titol: original.titol + ' (Còpia)',
      respostes: [],
    };
    afegirHistorial([...enquestes, copia]);
  };

  const eliminarEnquesta = (id: string) => {
    const nouArray = enquestes.filter((e) => e.id !== id);
    afegirHistorial(nouArray);
  };

  const desferAccio = () => {
    if (historial.length === 0) return;
    const nouHistorial = [...historial];
    const anterior = nouHistorial.pop();
    setHistorial(nouHistorial);
    if (anterior) setEnquestes(anterior);
  };

  return (
    <EnquestesContext.Provider
      value={{
        enquestes,
        crearEnquesta,
        respondreEnquesta,
        duplicarEnquesta,
        eliminarEnquesta,
        desferAccio,
      }}
    >
      {children}
    </EnquestesContext.Provider>
  );
};
