import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../../utils/Colors';

const SkillsComponent = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const skills = [
    'Skill 1',
    'Skill 2',
    'Skill 3',
    'Skill 4',
    'Skill 5',
    'Skill 6',
    'Skill 7',
    'Skill 8',
    'Skill 9',
    'Skill 10',
    'Skill 11',
  ];

  const handleSkillSelect = skill => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Select Skills</Text>
      </View>
      <View style={styles.skillsContainer}>
        {skills.map(skill => (
          <TouchableOpacity
            key={skill}
            style={[
              styles.skillItem,
              selectedSkills.includes(skill) && styles.selectedSkillItem,
            ]}
            onPress={() => handleSkillSelect(skill)}>
            <Text
              style={[
                styles.skillText,
                selectedSkills.includes(skill) && styles.selectedSkillText,
              ]}>
              {skill}
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
