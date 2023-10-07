import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import ImagePicker from 'react-native-image-picker';
import { APIConstant, APIEndPoint, APIRequest } from "../../../framework/src/AppConstant";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start

// Customizable Area End
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  is50PointsSelected: boolean;
  is100PointsSelected: boolean;
  is250PointsSelected: boolean;
  imgData: any;
  message: string;
  isLoading: boolean;
  amount: number;
  receiverUserID: string;
  receiverUserData: any
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class PMComposeController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  apiPMCompose: string = ''
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    const navigationParams = this.props.navigation.state.params;
    let receiverUser = navigationParams.receiverUser;
    let userID = receiverUser.userID

    this.subScribedMessages = [
      // Customizable Area Start
      // getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIRequestMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage)
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      is50PointsSelected: true,
      is100PointsSelected: false,
      is250PointsSelected: false,
      imgData: {},
      message: "",
      isLoading: false,
      amount: 50,
      receiverUserID: userID,
      receiverUserData: receiverUser
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.setState({ message: "", imgData: {}, amount: 50, is50PointsSelected: true, is100PointsSelected: false, is250PointsSelected: false, })
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let apiRequestCallId: any = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (apiRequestCallId === this.apiPMCompose) {
        if (responseJson) {
          this.setState({ isLoading: false, message: "", imgData: {}, amount: 50, is50PointsSelected: true, is100PointsSelected: false, is250PointsSelected: false, })
          this.props.navigation.navigate("PmChatView", { receiverUser: this.state.receiverUserData });
        } else {
          this.showAlert(
            configJSON.errorTitle,
            errorReponse,
            ""
          );
        }
      }
    }
    // Customizable Area End
  }

  createPMCompose = async () => {
    this.setState({ isLoading: true })

    const header = {
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA",
      'Content-Type': 'multipart/form-data'
    };

    // Create the form data object
    const formData = new FormData();
    formData.append("message", this.state.message);
    formData.append("points", this.state.amount as unknown as Blob);
    if (this.state.imgData.uri !== undefined) {
      formData.append("image", {
        uri: this.state.imgData?.uri,
        type: this.state.imgData?.type,
        name: this.state.imgData?.fileName
      } as unknown as Blob);
    }
    let apiEndPoint =
      APIEndPoint.endPointAPIPmChat + APIConstant.markQuestion + APIConstant.paramsReceiverID + APIConstant.markEqual + this.state.receiverUserID

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiPMCompose = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
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
      APIRequest.httpPostMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }

  option50Selected = () => {
    this.setState({
      is50PointsSelected: true,
      is100PointsSelected: false,
      is250PointsSelected: false,
      amount: 50
    })
  }

  option100Selected = () => {
    this.setState({
      is50PointsSelected: false,
      is100PointsSelected: true,
      is250PointsSelected: false,
      amount: 100
    })
  }

  option250Selected = () => {
    this.setState({
      is50PointsSelected: false,
      is100PointsSelected: false,
      is250PointsSelected: true,
      amount: 250
    })
  }

  setMessage = (message: string) => {
    this.setState({ message: message })
  }

  selectFile = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        let source = res;
        this.setState({
          imgData: source
        });
      }
    });
  };
  // Customizable Area End
}
