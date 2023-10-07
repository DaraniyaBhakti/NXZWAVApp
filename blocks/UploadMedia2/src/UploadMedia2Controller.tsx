import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { Alert } from "react-native";

export interface SelectedPhotos {
  index: number,
  item: {
    node: PhotoNode
  }
}

export interface PhotoNode {
  group_name: string,
  image: {
    extension: string,
    fileSize: number
    fileName: string,
    height: number | null,
    playableDuration: string | null,
    uri: string,
    width: number | null,
  },
  location: string | null,
  timestamp: number,
  type: string
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  photos: any[];
  isCameraView: boolean;
  selectedPhotos: any;
  isUploadDelete: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UploadMedia2Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      photos: [],
      isCameraView: true,
      selectedPhotos: {},
      isUploadDelete: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  async componentDidMount() {
    await this.getAllPhotos()
    this.props.navigation.addListener("willFocus", async () => {
      this.setState({ selectedPhotos: { "item": this.state.photos?.[1], "index": 0 } })
    });
  }
  getAllPhotos = async () => {
    CameraRoll.getPhotos({
      first: 500,
      include: ['fileSize', 'filename', 'fileExtension'],
    })
      .then((r: { edges: any; }) => {
        let cameraObject: any = { isCamera: true };
        this.setState({ photos: [cameraObject, ...r.edges] }, () => {
          this.setState({ selectedPhotos: { "item": this.state.photos?.[1], "index": 0 } })
        });
      })
      .catch((err: any) => {
        Alert.alert(configJSON.labelPleaseTry, err)
      });
  };

  onSelectPhoto = async (item: any, index: number) => {
    this.setState({ selectedPhotos: { item, index } })
  };

  setUploadDelete = (value: boolean) => {
    this.setState({ isUploadDelete: value })
  }

  navigateToPostCreationScreen = () => {
    this.props.navigation.navigate(configJSON.labelEditWav, {
      selectedPhoto: this.state.selectedPhotos?.item
    })
  }

  // Customizable Area End
}