import React, { useContext } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search jobs..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={[
          styles.input,
          isDarkMode && styles.inputDark
        ]}
        placeholderTextColor={isDarkMode ? '#888' : '#666'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    color: '#000',
  },
  inputDark: {
    backgroundColor: '#333',
    color: '#fff',
  },
});

export default SearchBar;