Lab6  :   https://github.com/omarabdellah01/app-enquestes.git

Para esta aplicación hemos usado React Native, que es como estamos haciendo nuestra aplicación inicial. Hemos seleccionado la aplicación de encuestas.

PULLS 01:

Crea la pantalla del menu de la aplicacion, en la que se pueden crear encuestas (como rol de administrador) (si quieres haz que para crear encuestas te lleve a otra pantalla) que se deben guardar usando async storage
Haz que el sistema envie un mensaje de confirmación tras quedar la encuesta
En el archivo app.js: haz que la pantalla que primero se muestre al ejecutar la web sea la de MainMenu (dentro de la carpeta de Screens)
Y pon el codigo de todas las screens, luego ya nos centaremos en arreglar errores y mejoras:

![image](https://github.com/user-attachments/assets/827656f9-164d-4a0d-91fe-bba64ea45174)

![image](https://github.com/user-attachments/assets/0a89ea1f-d886-4674-bcd7-d952934db87b)

![image](https://github.com/user-attachments/assets/04e67271-64b3-49e2-857d-66838c1e2509)

![image](https://github.com/user-attachments/assets/3e9573fe-f4c7-463f-8367-b91692b54b57)

PULLS 02:

A la app le faltan muchas cosas, como la opción para que el administrador cree encuestas con preguntas y opciones, que los usuarios puedan responderlas de forma anónima, 
que se puedan duplicar encuestas para reutilizarlas con pequeños cambios y que los usuarios vean resultados estadísticos para entender las respuestas todo esto debe estar disponible en la interfaz principal 
y permitir deshacer acciones si hace falta además el sistema tiene que confirmar cada acción con un mensaje y asegurarse de guardar bien todos los datos para que sean accesibles después también el diseño debe ser mucho más moderno 
y atractivo nada de botones cuadrados ni estilo anticuado.

![image](https://github.com/user-attachments/assets/055403f5-890f-4d26-be3a-042c821a2ca3)

![image](https://github.com/user-attachments/assets/9ae39141-242f-432c-992b-00eb33fea575)

![image](https://github.com/user-attachments/assets/94852927-6e44-4776-8c3a-6cdc98744b57)

![image](https://github.com/user-attachments/assets/52380fd0-16d5-4ff7-8d0a-b16e96ea0690)

PULLS 03:
Vale, por lo que veo tengo varios errores relacionados con:
No encuentra el módulo '../context/EnquestesContext'.
El tipo de useContext(EnquestesContext) aparece como unknown, por eso no reconoce las propiedades.
Además, hay varios errores de tipos implícitos no declarados en las funciones. Los podrias arreglar?

![image](https://github.com/user-attachments/assets/56e42afd-779c-493d-9021-5f5f35347bdc)

![image](https://github.com/user-attachments/assets/f1928cbe-8240-4001-9fb1-ef7483b48d80)

![image](https://github.com/user-attachments/assets/7d50a08c-7213-43a9-815d-0244223da7a1)


Reflexió:

L’ús de GitHub Copilot ha estat molt útil per accelerar el desenvolupament inicial i generar les estructures bàsiques de codi, com el context i les pantalles. Ha ajudat especialment a escriure codi TypeScript i gestió d’estat que hauria trigat més a escriure manualment.

No obstant, ha requerit revisió constant per assegurar la correcció del codi i adaptar-lo a les necessitats específiques. També ha estat necessari introduir prompts molt específics i iterar per refinar el resultat. En resum, Copilot és una eina que ajuda molt però que requereix supervisió i validació.
