import { NativeModules } from 'react-native';

jest.mock('WebView', () => 'WebView');

NativeModules.PdfViewManager = {
  supportPDFKit: jest.fn(cb => cb(true)),
};

NativeModules.PdfWrapper = {
  isPdfValid: jest.fn().mockReturnValue(true),
};
