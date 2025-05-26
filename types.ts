// types.ts
export type Pregunta = {
  pregunta: string;
  opcions: string[];
};

export type Resposta = {
  [pregunta: string]: string; // pregunta -> opcio escollida
};

export type Enquesta = {
  id: string;
  titol: string;
  preguntes: Pregunta[];
  respostes: Resposta[];
};

