import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  NativeModules,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import Pdf from 'react-native-pdf';
import PdfWebView from './PdfWebView';
import Error from './Error';

const { PdfViewManager } = NativeModules;

const IS_IOS = Platform.OS === 'ios';

class PdfViewer extends Component {
  static propTypes = {
    ...Pdf.propTypes,
    onLoadComplete: PropTypes.func,
    onError: PropTypes.func,
    loading: PropTypes.node,
    error: PropTypes.node,
  };

  static defaultProps = {
    onLoadComplete: () => {},
    onError: () => {},
    loading: <ActivityIndicator />,
    error: <Error />,
  };

  state = {
    isLoading: true,
    hasError: false,
    supportsPDFKit: null,
    filePath: null,
  };

  componentDidMount() {
    this.handleCheckPDFKitSupport();
  }

  getFilePath = () => this.state.filePath;

  retryPdf = () => this.setState({ isLoading: true, hasError: false });

  handleCheckPDFKitSupport = () => {
    if (IS_IOS) {
      PdfViewManager.supportPDFKit(this.handleSupportPDFKit);
    }
  };

  handleSupportPDFKit = supportsPDFKit => this.setState({ supportsPDFKit });

  handlePdfLoaded = (filePath) => {
    this.setState({
      isLoading: false,
      filePath,
    });

    this.props.onLoadComplete();
  };

  handleError = (error) => {
    this.setState({
      isLoading: false,
      hasError: true,
    });

    this.props.onError(error);
  };

  renderError = () => React.cloneElement(this.props.error, {
    retryPdf: this.retryPdf,
  });

  renderLoading = () => React.cloneElement(this.props.loading);

  renderPdf = () => {
    const { hasError, supportsPDFKit } = this.state;

    if (hasError) {
      return this.renderError();
    }

    if (IS_IOS && supportsPDFKit === false) {
      return (
        <PdfWebView
          {...this.props}
          onLoadComplete={this.handlePdfLoaded}
          onError={this.handleError}
        />
      );
    }

    if (IS_IOS && supportsPDFKit === null) {
      return null;
    }

    return (
      <Pdf
        {...this.props}
        onLoadComplete={(n, filePath) => this.handlePdfLoaded(filePath)}
        activityIndicator={<View />}
        onError={this.handleError}
        style={styles.pdf}
      />
    );
  }

  render() {
    const { isLoading } = this.state;

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
