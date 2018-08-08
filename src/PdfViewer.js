import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, NativeModules, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import PdfWebView from './PdfWebView';

const { PdfViewManager } = NativeModules;

const IS_IOS = Platform.OS === 'ios';

class PdfViewer extends Component {
  static propTypes = {
    ...Pdf.propTypes,
    loading: PropTypes.node,
    error: PropTypes.node,
  };

  static defaultProps = {
    onLoadComplete: () => {},
    onError: () => {},
    loading: <ActivityIndicator />,
    error: <Text>Error thing</Text>,
  };

  state = {
    isLoading: true,
    hasError: false,
    supportsPDFKit: null,
  };

  componentDidMount() {
    if (IS_IOS) {
      PdfViewManager.supportPDFKit(this.handleSupportPDFKit);
    }
  }

  handleSupportPDFKit = supportsPDFKit =>
    this.setState({
      supportsPDFKit,
    });

  handlePdfLoaded = () => {
    this.setState({ isLoading: false });

    this.props.onLoadComplete();
  };

  handleError = (error) => {
    this.setState({
      isLoading: false,
      hasError: true,
    });

    this.props.onError(error);
  };

  renderError = () => React.cloneElement(this.props.error);

  renderLoading = () => React.cloneElement(this.props.loading);

  renderPdf = () => {
    const { hasError, supportsPDFKit } = this.state;

    if (hasError) {
      return this.renderError();
    }

    if (supportsPDFKit === null) {
      return null;
    }

    if (!supportsPDFKit) {
      return (
        <PdfWebView
          {...this.props}
          onLoadComplete={this.handlePdfLoaded}
          onError={this.handleError}
        />
      );
    }

    return (
      <Pdf
        {...this.props}
        onLoadComplete={this.handlePdfLoaded}
        activityIndicator={<View />}
        onError={this.handleError}
        style={styles.pdf}
      />
    );
  }

  render() {
    const { Loading, ...props } = this.props;
    const { isLoading, supportsPDFKit } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && this.renderLoading()}

        {this.renderPdf()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default PdfViewer;
