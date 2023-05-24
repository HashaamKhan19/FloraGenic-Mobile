import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import {gql, useQuery} from '@apollo/client';

const GET_SKILLS = gql`
  query Query {
    skills {
      id
      name
      description
      image
    }
  }
`;

const SkillsComponent = ({skills, setSkills}) => {
  const {data, loading, error} = useQuery(GET_SKILLS);

  const handleSkillSelect = skill => {
    if (skills.includes(skill?.id)) {
      setSkills(skills.filter(s => s !== skill?.id));
    } else {
      setSkills([...skills, skill?.id]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Select Skills</Text>
      </View>
      <View style={styles.skillsContainer}>
        {data?.skills?.map(skill => (
          <TouchableOpacity
            key={skill?.id}
            style={[
              styles.skillItem,
              skills.includes(skill?.id) && styles.selectedSkillItem,
            ]}
            onPress={() => handleSkillSelect(skill)}>
            <Text
              style={[
                styles.skillText,
                skills.includes(skill?.id) && styles.selectedSkillText,
              ]}>
              {skill?.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 8,
    color: Colors.black,
    fontFamily: 'Urbanist-Bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillItem: {
    backgroundColor: '#e3e3e3',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSkillItem: {
    backgroundColor: Colors.floraGreen,
  },
  skillText: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
  },
  selectedSkillText: {
    color: Colors.white,
  },
});

export default SkillsComponent;
