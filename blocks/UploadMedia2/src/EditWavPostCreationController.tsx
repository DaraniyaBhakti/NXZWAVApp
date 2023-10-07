import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
export interface Post {
  caption: string,
  user_profile_id: number,
  taglist: string,
  categoriesList: string,
  unlockAmount: number,
  isLockedProfile: boolean,
  isPromote: boolean
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
  photoUrl: string;
  promotePostSwitchFlag: boolean;
  isPublicSelectedFlag: boolean;
  postCreationData: Post;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class EditWavPostCreationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiPostCreation: string = '';
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      getName(MessageEnum.RestAPIResponceMessage)
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      photoUrl: "",
      promotePostSwitchFlag: false,
      isPublicSelectedFlag: true,
      postCreationData: {
        caption: "",
        user_profile_id: 13,
        taglist: "",
        categoriesList: "",
        unlockAmount: 0,
        isLockedProfile: false,
        isPromote: false
      }
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let apiRequestCallId: string = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (apiRequestCallId === this.apiPostCreation) {
        if (responseJson) {
          console.log(responseJson)
        } else {
          this.showAlert(
            configJSON.labelError,
            errorReponse, ""
          );
        }
      }
    }
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

  createPost = () => {
    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    };
    let photo = this.props.navigation.state.params?.selectedPhoto?.node?.image

    // Create the form data object

    const formData = new FormData();
    formData.append("user_profile_info_id", this.state.postCreationData.user_profile_id as unknown as Blob);
    formData.append("description", this.state.postCreationData.caption);
    formData.append("category_id", this.state.postCreationData.categoriesList);
    formData.append("tag_list", this.state.postCreationData.taglist);
    formData.append("promote", this.state.postCreationData.isPromote as unknown as Blob);
    formData.append("locked", this.state.postCreationData.isLockedProfile as unknown as Blob);
    formData.append("points", this.state.postCreationData.unlockAmount as unknown as Blob);
    formData.append("post_image", {
      uri: photo?.uri,
      type: 'image/jpeg',
      name: photo?.filename
    } as unknown as Blob);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiPostCreation = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postCreation
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }

  addTagDataMethod = (newTags: string) => {
    this.setState({ postCreationData: { ...this.state.postCreationData, "taglist": newTags } });
  };
  addCategoriesDataMethod = (newCategories: string) => {
    this.setState({ postCreationData: { ...this.state.postCreationData, "categoriesList": newCategories } });
  };
  setUnlockAmountDataMethod = (amount: number) => {
    this.setState({ postCreationData: { ...this.state.postCreationData, "unlockAmount": amount } });
  };

  setCaption = (textString: string) => {
    this.setState({ postCreationData: { ...this.state.postCreationData, "caption": textString } })
  }

  setIsPublicLockFlag = (isPublicSelectedFlag: boolean, isLockedProfile: boolean) => {
    this.setState({ isPublicSelectedFlag: isPublicSelectedFlag, postCreationData: { ...this.state.postCreationData, "isLockedProfile": isLockedProfile, "unlockAmount": 0 } })
  }

  navigateToCategoryScreen = () => {
    this.props.navigation.navigate(configJSON.labelAddCategories, {
      addCategoriesData: this.addCategoriesDataMethod,
      postCreationData: this.state.postCreationData
    })
  }

  navigateToTagsScreen = () => {
    this.props.navigation.navigate(configJSON.labelHashtags, {
      addTagData: this.addTagDataMethod,
      postCreationData: this.state.postCreationData
    })
  }

  navigateToUnlockAmountScreen = () => {
    this.props.navigation.navigate(configJSON.labelGamification, {
      setUnlockAmountData: this.setUnlockAmountDataMethod,
      postCreationData: this.state.postCreationData
    })
  }

  setIsPromote = () => {
    this.setState({
      promotePostSwitchFlag: !this.state.promotePostSwitchFlag,
      postCreationData: { ...this.state.postCreationData, "isPromote": !this.state.postCreationData.isPromote }
    })
  }

  navigateToUploadMedia = () => {
    this.setState({
      postCreationData: {
        caption: "",
        user_profile_id: 13,
        taglist: "",
        categoriesList: "",
        unlockAmount: 0,
        isLockedProfile: false,
        isPromote: false
      }
    })
    this.props.navigation.navigate(configJSON.labelUploadMedia2)
  }

  photoURL = () => {
    return this.props.navigation.state.params?.selectedPhoto?.node?.image?.uri ?? ''
  }
  // Customizable Area End
}