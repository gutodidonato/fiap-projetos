import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Task {
  key: string;
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
  isEnabled: boolean;
}

interface TaskItemProps {
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
  isEnabled: boolean;
  toggleSwitch: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ text, icon, isEnabled, toggleSwitch, onEdit, onDelete }) => {
  return (
    <TouchableOpacity onPress={toggleSwitch}>
      <View style={styles.taskItem}>
        <Ionicons name={icon} size={24} color="black" />
        <Text style={[styles.taskText, { textDecorationLine: isEnabled ? 'line-through' : 'none' }]}>{text}</Text>
        <TouchableOpacity onPress={onEdit} style={{ marginRight: 12 }}>
          <Ionicons name="pencil-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const toggleSwitch = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].isEnabled = !newTasks[index].isEnabled;
    setTasks(newTasks);
  }

  const addTask = () => {
    if (editingTask) {
      const newTasks = [...tasks];
      newTasks[editingTask.index] = { ...editingTask, text: task };
      setTasks(newTasks);
      setEditingTask(null);
    } else {
      const newTask = { key: (tasks.length + 1).toString(), text: task, icon: 'checkmark-done-outline', isEnabled: false };
      setTasks([...tasks, newTask]);
    }
    setTask('');
  }

  const deleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  const editTask = (index: number) => {
    setTask(tasks[index].text);
    setEditingTask({ ...tasks[index], index });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <TaskItem
            text={item.text}
            icon={item.icon}
            isEnabled={item.isEnabled}
            toggleSwitch={() => toggleSwitch(index)}
            onEdit={() => editTask(index)}
            onDelete={() => deleteTask(index)}
          />
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
  toggleSwitch: {
    width: 50,
    height: 25,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
  },
});

export default App; 