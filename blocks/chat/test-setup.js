// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'macos',
  select: () => null
}));
const mockResponse = {
  didCancel: false,
  error: null,
};
jest.mock('react-native-image-picker', () => ({
  showImagePicker: jest.fn((options, callback) => {
    callback(mockResponse);
  }),
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
}));

const customFormData = () => {};
customFormData.prototype.constructor = jest.fn();
customFormData.prototype.append = jest.fn();

global.FormData = customFormData;
