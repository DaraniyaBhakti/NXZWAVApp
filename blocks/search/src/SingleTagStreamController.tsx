import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// import { URLSearchParams } from "url";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  searchText: string;
  searchList: any;
  activeId: number;
  activeFirstName: string;
  activeLastName: string;
  activeUserName: string;
  activeEmail: string;
  activePhoneNumber: string;
  activeCountryCode: string;
  activeType: string;
  activeDeviceId: string;
  activeCreatedAt: string;
  isVisible: boolean;

  postList: any[];
  tag: string;
  tagUrl: string;
  taggingCount: number;
  loader: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SingleTagStreamController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  apiGetTaggedPostList: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIRequestMessage)
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      searchText: "",
      searchList: [],
      activeId: 0,
      activeFirstName: "",
      activeLastName: "",
      activeUserName: "",
      activeEmail: "",
      activePhoneNumber: "",
      activeCountryCode: "",
      activeType: "",
      activeDeviceId: "",
      activeCreatedAt: "",
      isVisible: false,

      postList: [],
      tag: "",
      tagUrl: "",
      taggingCount: 0,
      loader: false

      // Customizable Area End
    };
    // Customizable Area Start
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.setState({ loader: true })
    this.getTaggedPostList();
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (apiRequestCallId === this.apiGetTaggedPostList) {
        if (responseJson && responseJson.data) {
          let headerImgUrl = responseJson.data.attributes.post_info.data[0].attributes.images !== null 
          ? responseJson.data.attributes.post_info.data[0].attributes.images : "https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg"
          this.setState({
            tag: responseJson.data.attributes.name,
            taggingCount: responseJson.data.attributes.taggings_count,
            tagUrl: headerImgUrl,
            postList: responseJson.data.attributes.post_info.data,
            loader: false
          })
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  getTaggedPostList =  () => {
    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetTaggedPostList = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getSingleTagStremApiEndpoint + `?tag_id=${this.props.navigation.state.params.tag_id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }
  // Customizable Area End
}