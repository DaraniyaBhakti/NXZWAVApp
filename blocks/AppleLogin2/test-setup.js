// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "ios",
  select: () => null,
}));

jest.mock("@invertase/react-native-apple-authentication", () => ({
  appleAuth:{
    isSupported: true,
    isSignUpButtonSupported: true,
    performRequest:jest.fn(),
    getCredentialStateForUser: jest.fn(),
    onCredentialRevoked: jest.fn(),
    Error:{
      UNKNOWN : '1000',
      CANCELED :'1001',
      INVALID_RESPONSE : '1002',
      NOT_HANDLED : '1003',
      FAILED : '1004',
    },
  },
  AppleRequestResponse: "",
}));

jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo);

