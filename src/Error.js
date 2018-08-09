import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Error = ({ retryPdf }) => (
  <View style={styles.container}>
    <Text style={styles.error}>
      There was an error while trying to load pdf.
    </Text>

    <TouchableOpacity
      onPress={retryPdf}
      style={styles.retryButtonContainer}
    >
      <Text style={styles.retry}>Retry</Text>
    </TouchableOpacity>
  </View>
);

Error.propTypes = {
  retryPdf: PropTypes.func,
};

Error.defaultProps = {
  retryPdf: () => null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 48,
  },
  error: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
  },
  retryButtonContainer: {
    marginTop: 12,
    padding: 6,
    borderRadius: 4,
  },
  retry: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Error;
