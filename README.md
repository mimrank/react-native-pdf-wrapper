<h1 align="center">react-native-pdf-wrapper</h1>
<p align="center">
  Easily show PDFs in React Native.
</p>

<p align="center">
  <a href="https://travis-ci.org/Tele2-NL/react-native-pdf-wrapper"><img src="https://travis-ci.org/Tele2-NL/react-native-pdf-wrapper.svg?branch=master"></a>
  <a href="https://github.com/Tele2-NL/react-native-pdf-wrapper/issues"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat"></a>
</p>

## Why?

This library was created to solve a problem of [react-native-pdf] which has a lot of issues with showing PDFs in iOS. Apple released [PDFKit] that solved all those problems but only for `iOS >= 11`, this library basically mimics all the file handling of `react-native-pdf` for iOS 10 and then show it on `react-native`'s `<WebView />`, any version `>= 11` will fallback to `react-native-pdf`.

## Installation

This library requires [react-native-pdf] (to show PDF for iOS >= 11 and Android) and [rn-fetch-blob] to handle file system access.

```bash
yarn add @tele2/react-native-pdf-wrapper react-native-pdf rn-fetch-blob
```

You will need to link native code as well:

```bash
react-native link @tele2/react-native-pdf-wrapper # required only for iOS
react-native link react-native-pdf
react-native link rn-fetch-blob
```

If you have any doubts on how to install [react-native-pdf][react-native-pdf-installation] or [rn-fetch-blob][rn-fetch-blob-installation] please refer to the respective repositories.

## Usage

```jsx
import React, { Component } from 'react';
import PdfWrapper from '@tele2/react-native-pdf-wrapper';

class MyComponent extends Component {
  render() {
    /**
    * `source` can also be:
    * - source={require('./file.pdf')}
    * - source={{ uri: 'base64-string' }}
    */
    return (
      <PdfWrapper
        source={{
          uri: 'https://www.amsterdam.nl/publish/pages/506699/amsterdam_and_europe_historical_ties_eu2016_edition.pdf',
        }}
      />
    );
  }
}

export default MyComponent;
```

> You can see more examples in the [example app].

## Props

All [react-native-pdf props].

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
loading|component|no|`<ActivityIndicator />`|Custom component to show while it's fetching the PDF
error|component|no|`<Error retryPdf={() => {}} />`|Custom component to show when an error occurs

## License
MIT © [Tele2 Netherlands].

[react-native-pdf]: https://github.com/wonday/react-native-pdf
[rn-fetch-blob]: https://github.com/joltup/rn-fetch-blob
[PDFKit]: https://developer.apple.com/documentation/pdfkit
[react-native-pdf-installation]: https://github.com/wonday/react-native-pdf/#installation
[rn-fetch-blob-installation]: https://github.com/joltup/rn-fetch-blob#user-content-installation
[example app]: https://github.com/Tele2-NL/react-native-pdf-wrapper/tree/master/example
[Tele2 Netherlands]: https://github.com/Tele2-NL
[react-native-pdf props]: https://github.com/wonday/react-native-pdf#configuration
