import React, { Component } from 'react';
import { NativeModules, View, WebView } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import SHA1 from 'crypto-js/sha1';
import { FILE_TYPES, getFileType, isRequestSuccessful } from './utils';

const { PdfWrapper } = NativeModules;

class PdfWebView extends Component {
  static propTypes = Pdf.propTypes;

  static defaultProps = {
    onError: () => {},
  };

  state = {
    source: null,
  };

  componentDidMount() {
    this.handleShowFile();
  }

  handleError = ({ error, localPath, temporaryPath }) => {
    this.props.onError(error);

    this.handleRemoveFiles(localPath, temporaryPath);
  };

  handleCopyLocalFile = destinationPath => RNFetchBlob.fs.cp(this.props.source.uri, destinationPath);

  handleWriteBase64File = destinationPath => RNFetchBlob.fs.writeFile(
    destinationPath,
    this.props.source.uri.replace(/data:application\/pdf;base64,/i, ''),
    'base64',
  );

  handleRemoveFiles = async (localPath, temporaryPath) => {
    await RNFetchBlob.fs.unlink(localPath);
    await RNFetchBlob.fs.unlink(temporaryPath);
  };

  handleRequestFile = temporaryPath => RNFetchBlob.config({ path: temporaryPath })
    .fetch(
      this.props.source.method || 'GET',
      this.props.source.uri,
      this.props.source.headers || {},
      this.props.source.body || '',
    );

  handleSetFile = uri => this.setState({ source: { uri } });

  handleShowFile = async () => {
    const { source } = this.props;

    // File will be stored under cache directory
    const localFilePath = `${RNFetchBlob.fs.dirs.CacheDir}/${SHA1(source.uri)}.pdf`;

    const fileType = getFileType(source);

    if (fileType === FILE_TYPES.LOCAL) {
      await this.handleCopyLocalFile(localFilePath);

      return this.handleSetFile(localFilePath);
    }

    if (fileType === FILE_TYPES.BASE_64) {
      await this.handleWriteBase64File(localFilePath);

      return this.handleSetFile(localFilePath);
    }

    const localTemporaryFilePath = `${localFilePath}.tmp`;

    // Remove any file with same path
    await this.handleRemoveFiles(localFilePath, localTemporaryFilePath);

    try {
      // First download to a local temporary file
      const response = await this.handleRequestFile(localTemporaryFilePath);
      // Check if request was successful
      if (!isRequestSuccessful(response)) {
        throw new Error('Invalid Pdf');
      }

      // Check if Pdf is not corrupted
      await PdfWrapper.isPdfValid(localTemporaryFilePath);

      // Copy the temporary file to a normal file
      await RNFetchBlob.fs.cp(localTemporaryFilePath, localFilePath);

      // Remove temporary file
      RNFetchBlob.fs.unlink(localTemporaryFilePath);

      this.handleSetFile(localFilePath);
    } catch (error) {
      this.handleError({
        error,
        localPath: localFilePath,
        temporaryPath: localTemporaryFilePath,
      });
    }
  }

  handlePdfLoaded = () => this.props.onLoadComplete(this.state.source.uri);

  render() {
    const { source } = this.state;

    if (!source) {
      return (
        <View />
      );
    }

    return (
      <WebView
        {...this.props}
        source={source}
        onLoadEnd={this.handlePdfLoaded}
      />
    );
  }
}

export default PdfWebView;
