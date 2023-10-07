// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.mock("@invertase/react-native-apple-authentication", () => ({
  appleAuth:'',
  AppleRequestResponse: "",
}));

jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo);
