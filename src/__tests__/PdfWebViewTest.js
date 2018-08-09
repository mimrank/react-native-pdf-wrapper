import React from 'react';
import { NativeModules } from 'react-native';
import { shallow } from 'enzyme';
import RNFetchBlob from 'rn-fetch-blob';
import PdfWebView from '../PdfWebView';

jest.useFakeTimers();

describe('<PdfWebView />', () => {
  beforeEach(() => {
    this.props = {
      source: {
        uri: 'https://remote/path/to/file',
      },
      onError: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const wrapper = shallow(<PdfWebView {...this.props} />);

    jest.runAllTimers();

    expect(wrapper).toMatchSnapshot();
  });

  it('should remove previous files with the same name', () => {
    shallow(<PdfWebView {...this.props} />);

    jest.runAllTimers();

    expect(RNFetchBlob.fs.unlink).toHaveBeenCalled();
  });

  it('should check that pdf is not corrupted', () => {
    shallow(<PdfWebView {...this.props} />);

    jest.runAllTimers();

    expect(NativeModules.PdfWrapper.isPdfValid).toHaveBeenCalledTimes(1);
  });
});
