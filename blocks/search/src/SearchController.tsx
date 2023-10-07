import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export interface Hashtags {
  id: string;
  type: string;
  attributes: {
    id: number;
    name: string;
    taggings_count: number;
    post_info: {data:PostInfo[]}
  }
}

export interface PostInfo {
  id: string;
  type: string;
  attributes: {
    admin_pinned: boolean;
    categories: string[];
    counts: {};
    created_at: string;
    description: string;
    id: number;
    images: string;
    locked: boolean;
    points: number;
    promote: boolean;
    tag_list: string[];
    unlocked_by: string[];
    updated_at: string;
    user_profile_info_id: {
      id: number;
      level: string;
      points: number;
      profile_pic: string;
      role: string;
      user_name: string
    }
  }
}

export interface CarouselPost {
  id: string;
  type: string;
  attributes: {
    description: string,
    images: string,
    reacts: string,
    updated_at: string,
    user_profile_info_id: {
      id: number,
      points: number,
      profile_pic: string | null,
      role: string,
      user_name: string
    }
  }
}

export interface TrendingPost {
  id: string;
  type: string;
  attributes: PostInfo
}

export interface PlayersItem {
  id: string;
  type: string;
  attributes: {
    id: number,
    player: {
      name: string,
      points: number,
      profile_pic: string | null,
      rank: number | null,
      reacts: string,
      role: string,
      user_id: number
    }
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

  selectedOption: string;
  tagsList: Hashtags[];
  loader: boolean;
  carouselList: CarouselPost[];
  trendingList: TrendingPost[];
  playersList: PlayersItem[];
  activeSlide: number;
  searchCaption: string;
  searchQuery: string;
  searchType: string;
  isSearchResults: boolean;
  itemHeights: number[],
  playerNotFound: boolean
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SearchController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  searchApiCallId: string = "";
  apiGetTrendingList: string = "";
  apiGetCarouselList: string = "";
  apiGetTagsList: string = "";
  apiGetPlayersList: string = "";
  apiGetSearchList: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage)
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

      selectedOption: configJSON.labelTrending,
      tagsList: [],
      trendingList: [],
      loader: false,
      carouselList: [],
      playersList: [],
      activeSlide: 0,
      searchCaption: configJSON.labelSearch,
      searchQuery: '',
      searchType: configJSON.labelSearchType,
      isSearchResults: false,
      itemHeights: [],
      playerNotFound: false
      // Customizable Area End
    };
    // Customizable Area Start
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    this.getTrendingList();
    this.getCarouselList();
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      switch (apiRequestCallId) {
        case this.apiGetTrendingList: {
          this.setState({ trendingList: responseJson?.data, loader: false }, () => this.generateRandomHeights())
          break;
        }
        case this.apiGetTagsList: {
          this.setState({ tagsList: responseJson?.data, loader: false })
          break;
        }
        case this.apiGetPlayersList: {
          this.setState({ playersList: responseJson?.data, loader: false })
          break;
        }
        case this.apiGetCarouselList: {
          this.setState({ carouselList: responseJson?.data })
          break;
        }
        case this.apiGetSearchList: {
          if (responseJson.data) {
            switch (this.state.selectedOption) {
              case configJSON.labelTrending: {
                this.setState({ trendingList: responseJson.data, loader: false })
                break;
              }
              case configJSON.labelTags: {
                this.setState({ tagsList: responseJson.data, loader: false })
                break;
              }
              case configJSON.labelPlayers: {
                this.setState({ playersList: responseJson.data, loader: false })
                break;
              }
            }
          } else if (responseJson.message && this.state.selectedOption === configJSON.labelPlayers) {
            this.setState({ playersList: [], playerNotFound: true, loader: false })
          }
          break;
        }
      }

    }
    // Customizable Area End
  }

  // Customizable Area Start

  getTrendingList = () => {
    this.setState({ loader: true })
    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetTrendingList = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getTrendingApiEndPoint
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

  getTagsList = () => {
    this.setState({ loader: true })
    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetTagsList = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getTagsListApiEndPoint
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

  getPlayerslList = () => {
    this.setState({ loader: true })
    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetPlayersList = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getPlayersListApiEndPoint
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

  getCarouselList = () => {
    this.setState({ loader: true })
    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetCarouselList = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCarouselApiEndPoint
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

  getSearchedList = () => {
    this.setState({ isSearchResults: true, loader: true })
    const header = {
      token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA",
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiGetSearchList = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getSearchListApiEndpoint + `?type=${this.state.searchType}&query=${this.state.searchQuery}`
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

  optionTrendingSelected = () => {
    this.setState({
      searchQuery: "",
      selectedOption: configJSON.labelTrending,
      searchCaption: configJSON.labelSearch,
      searchType: configJSON.labelSearchType,
    })
  }

  optionTagsSelected = () => {
    this.setState({
      searchQuery: "",
      selectedOption: configJSON.labelTags,
      searchCaption: configJSON.labelSearchTags,
      searchType: configJSON.labelSearchTagsType,
    })
    this.getTagsList()
  }

  optionPlayersSelected = () => {
    this.setState({
      isSearchResults: false,
      searchQuery: "",
      selectedOption: configJSON.labelPlayers,
      searchCaption: configJSON.labelSearchPlayers,
      searchType: configJSON.labelSearchPlayersType,
    })
    this.getPlayerslList();
  }

  generateRandomHeights() {
    const numberOfImages = this.state.trendingList.length;
    const heights = [];
    for (let i = 0; i < numberOfImages; i++) {
      const height = Number(Math.random() * 22 + 9) * 8;
      heights.push(height);
    }
    this.setState({ itemHeights: heights });
  }

  setSearchQuery = (text: string) => {
    this.setState({ searchQuery: text })
  }

  setActiveSlide = (index: number) => {
    this.setState({ activeSlide: index })
  }

  navigateToTagsScreen = (id: number) => {
    this.props.navigation.navigate('SingleTagStream', { "tag_id": id })
  }

  txtInputSearchTextProps = {
    onChangeText: (text: string) => {
      this.setState({ searchText: text });
    }
  };

  setSearchText = (text: string) => {
    this.setState({ searchText: text });
  };

  hideModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  setModal = (item: any) => {
    this.setState({
      activeId: item.id,
      activeFirstName: item.attributes.first_name,
      activeLastName: item.attributes.last_name,
      activeUserName: item.attributes.user_name,
      activeEmail: item.attributes.email,
      activePhoneNumber: item.attributes.phone_number,
      activeCountryCode: item.attributes.country_code,
      activeType: item.type,
      activeDeviceId: item.attributes.device_id,
      activeCreatedAt: item.attributes.created_at,
      isVisible: !this.state.isVisible
    });
  };

  getSearchList = (token: string) => {
    const header = {
      "Content-Type": configJSON.searchApiContentType,
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    const attrs = {
      query: this.state.searchText
    };

    this.searchApiCallId = requestMessage.messageId;
    let urlParams = new URLSearchParams(attrs).toString();

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getSearchApiEndPoint}?${urlParams}`
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
  };
  // Customizable Area End
}
