import { Button, FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import styles from './styles1';
import { useSupabase } from '../context/useSupabase';

const GoalScreen = () => {
  const { goals, createGoal, updateGoal, generateAndStoreActivities,  } = useSupabase();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');


  const handleSave = async () => {
    if (currentGoal) {
      await updateGoal(currentGoal.id, title, category, description);
    } else {
      await createGoal(title, category, description);
    }
    setModalVisible(false);
    setTitle('');
    setCategory('');
    setDescription('');
    setCurrentGoal(null);
  };

  const handleEdit = (goal) => {
    setCurrentGoal(goal);
    setTitle(goal.title);
    setCategory(goal.category);
    setDescription(goal.description);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentGoal(null);
    setTitle('');
    setCategory('');
    setDescription('');
    setModalVisible(true);
  };

  const genActivities = async () => {
    if (currentGoal) {
      await generateAndStoreActivities(currentGoal.id, title, description);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.largeTitle}>Goals</Text>
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <View style={customStyles.goalItem}>
                <Text style={customStyles.goalTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={customStyles.separator} />}
        />
        <Button title="Add Goal" onPress={handleAdd} />
        <Modal visible={isModalVisible} animationType="none">
          <View style={customStyles.modalContent}>
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={customStyles.input}
            />
            <TextInput
              placeholder="Category"
              value={category}
              onChangeText={setCategory}
              style={customStyles.input}
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={customStyles.textArea}
              multiline
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Generate" onPress={genActivities} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default GoalScreen;

const customStyles = StyleSheet.create({
  goalItem: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  goalTitle: {
    fontSize: 14,
    // fontWeight: 'bold',
  },
  goalCategory: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    height: 100,  // Adjust height for larger input area
    textAlignVertical: 'top',  // Ensure text starts at the top
  },
});
