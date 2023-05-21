import React, {useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import SearchIcon from '../../assets/svg/searchIcon.svg';
import Colors from '../../utils/Colors';

const SearchInput = ({query, setQuery, inputRef}) => {
  return (
    <View style={styles.container}>
      {/* <SearchIcon width={20} height={20} /> */}
      <TextInput
        style={styles.input}
        placeholder="🔎︎ Search..."
        placeholderTextColor="darkgrey"
        value={query}
        onChangeText={text => setQuery(text)}
        ref={inputRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: 'white',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontFamily: 'Urbanist-Light',
    fontSize: 16,
    color: Colors.blackishGray,
  },
});

export default SearchInput;
