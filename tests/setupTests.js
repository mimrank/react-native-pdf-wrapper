import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '../__mocks__/nativeModules';

Enzyme.configure({ adapter: new Adapter() });
