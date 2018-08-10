import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PdfWrapper from '@tele2/react-native-pdf-wrapper';
import base64 from './files/base64';

const PDF_EXAMPLE_TYPES = {
  REMOTE: 'REMOTE',
  LOCAL: 'LOCAL',
  BASE64: 'BASE64',
  CORRUPTED: 'CORRUPTED',
};

const PDF_EXAMPLE_SOURCES = {
  [PDF_EXAMPLE_TYPES.REMOTE]: {
    uri: 'https://www.amsterdam.nl/publish/pages/506699/amsterdam_and_europe_historical_ties_eu2016_edition.pdf',
  },
  [PDF_EXAMPLE_TYPES.LOCAL]: require('./files/local.pdf'),
  [PDF_EXAMPLE_TYPES.BASE64]: { uri: base64 },
  [PDF_EXAMPLE_TYPES.CORRUPTED]:  require('./files/corrupted.pdf'),
};

const Row = ({ label, type, navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.push('Pdf', { type })}
    style={styles.row}
  >
    <Text style={styles.rowText}>{label}</Text>
  </TouchableOpacity>
)

const List = ({ navigation }) => (
  <ScrollView style={styles.container}>
    <Row
      label="Remote Pdf"
      type={PDF_EXAMPLE_TYPES.REMOTE}
      navigation={navigation}
    />

    <Row
      label="Local Pdf"
      type={PDF_EXAMPLE_TYPES.LOCAL}
      navigation={navigation}
    />

    <Row
      label="Base64 Pdf"
      type={PDF_EXAMPLE_TYPES.BASE64}
      navigation={navigation}
    />

    <Row
      label="Corrupted Pdf"
      type={PDF_EXAMPLE_TYPES.CORRUPTED}
      navigation={navigation}
    />
  </ScrollView>
);

const Pdf = ({ navigation }) => (
  <PdfWrapper
    source={PDF_EXAMPLE_SOURCES[navigation.state.params.type]}
  />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    paddingVertical: 18,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  rowText: {
    color: 'black',
  },
});

export default createStackNavigator({
  List: {
    screen: List,
    navigationOptions: {
      title: 'List',
    },
  },
  Pdf: {
    screen: Pdf,
    navigationOptions: {
      title: 'Pdf',
    },
  },
});
