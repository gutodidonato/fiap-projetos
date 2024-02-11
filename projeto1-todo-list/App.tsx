import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Input, Button, ListItem, CheckBox, Icon } from '@rneui/native';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = { id: Date.now(), name: task, completed: false };
    setTasks([...tasks, newTask]);
    setTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Add new task"
        onChangeText={setTask}
        value={task}
        rightIcon={
          <Icon
            name="add"
            onPress={addTask}
            size={24}
            color="black"
          />
        }
      />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem.Swipeable
            bottomDivider
            rightContent={(reset) => (
              <Button
                title="Delete"
                onPress={() => { deleteTask(item.id); reset(); }}
                icon={{ name: 'delete', color: 'white' }}
                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
              />
            )}
          >
            <CheckBox
              checked={item.completed}
              onPress={() => toggleComplete(item.id)}
            />
            <ListItem.Content>
              <ListItem.Title style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
                {item.name}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem.Swipeable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});

export default App;
