import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { makeStyles, Text, useThemeMode } from "@rneui/themed";
import { Input, Button } from '@rneui/themed';

export default function App() {
  const [texto, setTexto] = useState<string>('')
  const [tarefas, setTarefas] = useState<string[]>([])


  // criar uma lista de tarefas
  // primeiro passo: criar a caixa de texto com validação
  // segundo passo: criar o botão de envia tarefa
  // terceiro passo: criar a lista de tarefas

  const handleAddTarefas = () => {
    // copiar array
    const copiaTarefas = [...tarefas]
    
    // adicionar item
    copiaTarefas.push(texto)

    // setar o tarefas     //['varrer chao', 'limpar sala', 'arrumar quarto', 'lavar louca']

    setTarefas(copiaTarefas)

    setTexto('')

  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Coloque aqui sua tarefa'
        errorStyle={styles.errorValidation}
        errorMessage={texto.length === 0 ? 'Este campo não pode ser vazio' : ''}
        onChangeText={txt => setTexto(txt)}
        value={texto}
      />  
        <Button               
              containerStyle={styles.button}
              onPress={handleAddTarefas}
              disabled={texto.length === 0}
              >
                Enviar
        </Button>
        {tarefas.map(tarefa => <TouchableOpacity>
          <Text>{tarefa}</Text>
          </TouchableOpacity>)}

    </View>
  );
}

// const useStyles = makeStyles((theme) => ({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     marginVertical: theme.spacing.lg,
//   },
// }));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 24
  },
  text: {
    marginVertical: 10
  },
  errorValidation: { color: 'red' },
  button: {
    marginHorizontal: 50,
    marginVertical: 10,
    width: '90%'
  }
})