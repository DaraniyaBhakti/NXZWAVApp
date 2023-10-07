import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { Alert } from "react-native";

export interface SelectedTag {
  // id: string,
  // type: string,
  attributes: {
    // id: number,
    name: string,
    taggings_count: number
  }
}

export interface Tag {
  id: string,
  type: string,
  attributes: {
    id: number,
    name: string,
    taggings_count: number
  }
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
  tags: Tag[];
  selectedTags: SelectedTag[],
  searchTag: string,
  newTag: string,
  loader: boolean
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class HashtagsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiGetTop40Tags: string = '';
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      tags: [],
      selectedTags: [],
      searchTag: "",
      newTag: "",
      loader: false
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

      if (apiRequestCallId === this.apiGetTop40Tags) {
        if (responseJson) {
          const selectedTagsString = this.props.navigation?.getParam(configJSON.labelPostCreationData).taglist;
          let array: { attributes: { name: string; taggings_count: number; }; }[] = [];
          selectedTagsString.split(",").map((item: string) => {
            if (responseJson.data.some((tag: { attributes: { name: string; }; }) => tag.attributes.name === item)) {
              array.push(responseJson.data.filter((tag: { attributes: { name: string; }; }) => item === tag.attributes.name)[0])
            } else {
              if (item !== '') {
                array.push({
                  attributes: {
                    name: item,
                    taggings_count: 0
                  }
                })
              }
            }
          })
          this.setState({
            tags: responseJson.data,
            selectedTags: array,
            loader: false
          })
        } else {
          this.showAlert(
            "Error",
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
  getTagsList = () => {

    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetTop40Tags = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getTagsApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }

  updateTags = () => {
    let tagsString = ""
    this.state.selectedTags.forEach((item) => {
      tagsString = tagsString.concat(item.attributes.name + ",")
    })
    tagsString = tagsString.slice(0, -1);
    let filteredList = this.state.tags.filter((item: Tag) =>
      item.attributes.name.toLowerCase().includes(this.state.searchTag.toLowerCase())
    );

    if (filteredList.length === 0) {
      this.setState({ newTag: this.state.searchTag })
      tagsString = tagsString.concat("," + this.state.searchTag)
    }
    if (tagsString.split(",").length > 5) {
      Alert.alert(configJSON.labelAlert)
    } else {
      const addTags = this.props.navigation.getParam(configJSON.labelAddTagData);
      addTags(tagsString);
      this.props.navigation.navigate(configJSON.labelEditWav)
    }
  };

  handleSelectTags = (item: Tag) => {
    this.setState({ selectedTags: [...this.state.selectedTags, item] });
  };

  handleRemoveTags = (index: number) => {
    const newSelectedItems = [...this.state.selectedTags];
    newSelectedItems.splice(index, 1);
    this.setState({ selectedTags: newSelectedItems });
  };

  filterTags = (list: Tag[]) => {
    let filteredList = list.filter((item: Tag) =>
      item.attributes.name.toLowerCase().includes(this.state.searchTag.toLowerCase())
    );
    return filteredList
  };

  setSearchTag = (text: string) => {
    this.setState({ searchTag: text, newTag: text })
  }

  async componentDidMount() {
    this.setState({ loader: true })
    this.getTagsList()
  }

  navigateToPostCreationScreen = () => {
    this.props.navigation.navigate(configJSON.labelEditWav)
  }
  // Customizable Area End
}