import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Colors from '../../utils/Colors';
import ChevronUp from '../../assets/svg/chevronUp.svg';
import ChevronDown from '../../assets/svg/chevronDown.svg';

const PlantDetails = ({
  route: {
    params: {data: plantData, url: image},
  },
}) => {
  const [isPlantInfoOpen, setPlantInfoOpen] = useState(true);
  const [isDiseaseInfoOpen, setDiseaseInfoOpen] = useState(false);

  const [InfoDetailsOpen, setInfoDetailsOpen] = useState(true);
  const [DiseaseDetailsOpen, setDiseaseDetailsOpen] = useState(true);

  const toggleInfoDetails = () => {
    setInfoDetailsOpen(!InfoDetailsOpen);
    setDiseaseDetailsOpen(!DiseaseDetailsOpen);
  };

  const togglePlantInfo = () => {
    setPlantInfoOpen(!isPlantInfoOpen);
    setDiseaseInfoOpen(false);
  };

  const toggleDiseaseInfo = () => {
    setDiseaseInfoOpen(!isDiseaseInfoOpen);
    setPlantInfoOpen(false);
  };

  console.log('disease in plant: ', plantData);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: image}} style={styles.img} resizeMode="cover" />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, isPlantInfoOpen && styles.activeTab]}
          onPress={togglePlantInfo}>
          <Text
            style={[styles.tabText, isPlantInfoOpen && styles.activeTabText]}>
            Plant Information
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, isDiseaseInfoOpen && styles.activeTab]}
          onPress={toggleDiseaseInfo}>
          <Text
            style={[styles.tabText, isDiseaseInfoOpen && styles.activeTabText]}>
            Disease Information
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.acrdCont}>
        {isPlantInfoOpen && (
          <>
            <TouchableOpacity
              onPress={toggleInfoDetails}
              style={styles.accordionBtn}>
              <View style={styles.insideAccordion}>
                <Text style={styles.actxt}>General Plant Information</Text>
                {InfoDetailsOpen ? <ChevronUp /> : <ChevronDown />}
              </View>
            </TouchableOpacity>
            {InfoDetailsOpen && (
              <ScrollView contentContainerStyle={styles.detailsCont}>
                {plantData?.predictions?.plant_species?.Species ? (
                  <Text style={styles.detailsTxt}>
                    Plant name: {plantData?.predictions?.plant_species?.Species}
                  </Text>
                ) : (
                  <Text style={styles.detailsTxt}>Plant name: Unknown</Text>
                )}
                {plantData?.predictions?.plant_species?.Probability && (
                  <Text style={styles.detailsTxt}>
                    Confidence:{' '}
                    {plantData?.predictions?.plant_species?.Probability} %
                  </Text>
                )}

                {plantData?.predictions?.plant_species?.quickFacts?.map(
                  (obj, index) => {
                    const entries = Object.entries(obj);
                    return (
                      <View key={index}>
                        {entries.map(([key, value]) => (
                          <View style={styles.detailsView}>
                            <Text key={key} style={styles.key}>
                              {key}
                            </Text>
                            <Text key={key} style={styles.value}>
                              {value}
                            </Text>
                          </View>
                        ))}
                      </View>
                    );
                  },
                )}
              </ScrollView>
            )}
          </>
        )}
        {isDiseaseInfoOpen && (
          <View style={{marginBottom: 350}}>
            <TouchableOpacity
              onPress={toggleInfoDetails}
              style={styles.accordionBtn}>
              <View style={styles.insideAccordion}>
                <Text style={styles.actxt}>Plant Disease Information</Text>
                {DiseaseDetailsOpen ? <ChevronUp /> : <ChevronDown />}
              </View>
            </TouchableOpacity>
            {DiseaseDetailsOpen && (
              <ScrollView contentContainerStyle={styles.detailsCont}>
                <Text style={styles.detailsTxt}>Detected Plants:</Text>
                {plantData?.predictions?.plant_disease?.map((obj, index) => {
                  console.log('obj: ', obj);
                  return (
                    <View>
                      {
                        <Text style={styles.detailsHeadingTxt}>
                          {obj.class}
                        </Text>
                      }
                      {!obj.diseaseData?.length ? (
                        <Text style={styles.detailsTxt}>No disease found</Text>
                      ) : (
                        obj.diseaseData?.map((disease, index) => {
                          return (
                            <View key={index} style={{marginVertical: 10}}>
                              <Text
                                style={{
                                  ...styles.detailsTxt,
                                  color: Colors.floraGreen,
                                  marginBottom: 5,
                                }}>
                                {disease?.heading}:
                              </Text>
                              <Text style={styles.detailsTxt}>
                                {disease?.text}
                              </Text>
                            </View>
                          );
                        })
                      )}
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.lightGreen,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.secondaryGreen,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
  },
  activeTabText: {
    color: Colors.white,
  },
  acrdCont: {
    gap: 20,
  },
  accordionBtn: {
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 10,
  },
  insideAccordion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    width: '65%',
    height: 260,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 20,
  },
  actxt: {
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
  },
  detailsTxt: {
    fontSize: 17,
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.black,
  },
  detailsHeadingTxt: {
    fontSize: 20,
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.red,
  },
  detailsCont: {
    padding: 16,
    color: Colors.black,
    fontFamily: 'Urbanist-Regular',
    gap: 10,
  },
  detailsView: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  key: {
    fontFamily: 'Urbanist-SemiBold',
    marginRight: 5,
    color: Colors.black,
  },
  value: {
    flex: 1,
    fontFamily: 'Urbanist-Regular',
    color: Colors.black,
  },
});

export default PlantDetails;
