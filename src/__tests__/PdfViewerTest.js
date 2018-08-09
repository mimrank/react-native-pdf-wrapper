import React from 'react';
import { Platform, NativeModules } from 'react-native';
import { shallow } from 'enzyme';
import PdfViewer from '../PdfViewer';

describe('<PdfViewer />', () => {
  beforeEach(() => {
    this.props = {
      source: {
        uri: 'https://remote/path/to/file',
      },
      onError: jest.fn(),
    };

    NativeModules.PdfViewManager.supportPDFKit = jest.fn(cb => cb(true));
    NativeModules.PdfViewManager.supportPDFKit.mockClear();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<PdfViewer {...this.props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should check if PDFKit is supported if platform is iOS', () => {
    Platform.OS = 'ios';

    shallow(<PdfViewer {...this.props} />);

    expect(NativeModules.PdfViewManager.supportPDFKit).toHaveBeenCalledTimes(1);
  });

  it('should store in state if PDFKit is supported', () => {
    Platform.OS = 'ios';

    const wrapper = shallow(<PdfViewer {...this.props} />);

    expect(wrapper.state().supportsPDFKit).toBe(true);
  });

  it('should fallback to `PdfWebView` if PDFKit is not supported', () => {
    Platform.OS = 'ios';

    NativeModules.PdfViewManager.supportPDFKit = jest.fn(cb => cb(false));

    const wrapper = shallow(<PdfViewer {...this.props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call `onError` if an error occurs', () => {
    const error = 'error';

    const wrapper = shallow(<PdfViewer {...this.props} />);

    wrapper.instance().handleError(error);

    expect(this.props.onError).toHaveBeenCalledWith(error);
  });

  it('should store that an error happened if an error occurs', () => {
    const error = 'error';

    const wrapper = shallow(<PdfViewer {...this.props} />);

    wrapper.instance().handleError(error);

    expect(wrapper.state().isLoading).toBe(false);
    expect(wrapper.state().hasError).toBe(true);
  });
});
