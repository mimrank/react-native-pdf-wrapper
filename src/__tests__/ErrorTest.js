import React from 'react';
import { shallow } from 'enzyme';
import Error from '../Error';

describe('<Error />', () => {
  beforeEach(() => {
    this.props = {
      retryPdf: jest.fn(),
    };

    this.wrapper = shallow(<Error {...this.props} />);
  });

  it('renders correctly', () => {
    expect(this.wrapper).toMatchSnapshot();
  });

  it('should call `retryPdf` when pressing the button', () => {
    this.wrapper.find('TouchableOpacity').first().props().onPress();

    expect(this.props.retryPdf).toHaveBeenCalledTimes(1);
  });
});
