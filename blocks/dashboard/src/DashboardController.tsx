import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {Alert, ImageProps,Share } from "react-native";
import React from "react";
import { PlayerIcon, PushedIcon, WavsIcon } from "./assets";
import { getStorageData } from "../../../framework/src/Utilities";
import { AsyncStorageKey } from "../../../components/src/AppGlobals";

export interface Crousalprops{
  id:string,
  type:string,
  attributes:{
    description:string,
    updated_at:string,
    images:string,
    user_profile_info_id:{
      id:number,
      user_name:string,
      role:string,
      points:number,
    },
    profile_pic:string,
    reacts:string,
  },
}

export interface Playersprops {
  id:string,
  type:string,
  attributes:{
    user_name:string,
    unlock_amount:string,
    apple_account_id:string,
    rank:number,
    profile_account_categories_id:{
      id:number,
      name:string
    },
    profile_pic:string
  },
}

export interface Postprops{
  id: string,
  type: string,
  attributes: {
    id: number,
    description: string,
    is_liked: null | boolean,
    created_at: string,
    locked?: boolean,
    unlocked_by: string[],
    points: number,
    updated_at: string,
    promote: boolean,
    admin_pinned?: boolean,
    tag_list: string[],
    images: string[],
    categories: string[],
    counts: {
      upvote_count: number,
      downvote_count: number,
      repost_count: number,
      comment_count: number
    },
    user_profile_info_id: {
      id: number,
      user_name: string,
      role: string,
      level: string,
      points: number,
      profile_pic: string | null
    }
  }
}

export interface LeaderBoardprops {
  id:string;
  type:string;
  attributes:{
    id: number,
    player: {
        user_id: number,
        name: string,
        rank: number,
        role: string,
        points: number,
        profile_pic: string | null,
        reacts: string
    }
  },
}

export interface FrndListprops {
    id: string,
    type: string,
    attributes: {
        user_name: string,
        unlock_amount: string,
        apple_account_id: number,
        level_name: string,
        points: number,
        rank: number,
        profile_account_categories_id: {
            id: number,
            name: string
        },
        profile_pic: string,
        cover_pic: string
    }
}

export interface Tabs {
  title:string,
  image:ImageProps,
  isActive:boolean,
  key:number
}
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  dashboardData: any;
  token: string;
  errorMsg: string;
  loading: boolean;
  tabs:Tabs[]
  crousal_data:Crousalprops[],
  post_data:Postprops[],
  pushed_Data:Playersprops[],
  pushed_posts:Postprops[],
  detail_players:LeaderBoardprops[],
  active_crousal:number,
  open_modal:boolean,
  modal_key:string,
  selected_radio:string,
  friendList:FrndListprops[],
  send_wav_modal:boolean,
  reactedFrom:string,
  repostisVisible:boolean,
  selectedPost:Postprops
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DashboardController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  apiDashboardItemCallId: string = "";
  apiPushedData:string = "";
  apiFrndList:string = "";
  apiLeaderBoardData:string = "";
  wavsPostData:string="";
  apiGetQueryStrinurl: string = "";
  postReactApi:string = "";
  // Customizable Area End
  
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    console.disableYellowBox = true;
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];

    this.state = {
      dashboardData: [],
      errorMsg: "",
      token:"",
      loading: true,
      tabs:[
        {key:1, title:"Wavs" , image:WavsIcon , isActive:true},
        {key:2, title:"Pushed" , image:PushedIcon , isActive:false},
        {key:3, title:"Players" , image:PlayerIcon , isActive:false},
      ],
      crousal_data:[],
      post_data:[],
      pushed_Data:[],
      pushed_posts:[],
      detail_players:[],
      open_modal:false,
      modal_key:"",
      send_wav_modal:false,
      selected_radio:"",
      friendList:[],
      active_crousal:0,
      reactedFrom:"",
      repostisVisible:false,
      selectedPost:{} as Postprops
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener('willFocus', () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    this.setState({
      token:await getStorageData(AsyncStorageKey.headerToken)
    } , ()=>{
      this.getDashboardData();
      this.leaderBoard();
      this.pushedData();
      this.getWavsPost();
      this.getFrndList()
    })
    // Customizable Area End
  }
  
  getToken=()=>{
    const msg: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(msg);
  }

  getDashboardData(): boolean {
    // Customizable Area Start
    const header = {
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiDashboardItemCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getDashboardCrousal
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    // Customizable Area End
    return true;
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

      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
    
      switch (apiRequestCallId) {
        case this.apiDashboardItemCallId:
          this.setCrousalData(responseJson , errorResponse)
        break;

        case this.apiPushedData:
          this.setUserPushData(responseJson , errorResponse)
          this.setUserPostData(responseJson , errorResponse)
        break;
        
        case this.apiLeaderBoardData:
          this.setLeaderBoarData(responseJson , errorResponse)
        break;

        case this.apiFrndList:
          this.setFrndList(responseJson , errorResponse)
        break;

        case this.wavsPostData:
          this.setWavPosts(responseJson , errorResponse)
        break;
      
        case this.postReactApi:
          this.setReact(responseJson , errorResponse)
        break;

        default:
          break;
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  setActiveTab = (key:number)=>{
    let activeTab = this.state.tabs
   for (const i of activeTab){
     i.isActive =  i.key === key ? true : false
   }
    this.setState({
      tabs:activeTab
    })
  }

  apiErr = (msg:any) =>{
    this.setState({loading:false})
    Alert.alert("SomeThing Went Wrong" , msg)
  }

  setCrousalData = (res:any , err:any) =>{
    if (res.data) {
      this.setState({ crousal_data: res.data, loading: false }) 
    }else{
      this.apiErr(err)
    }
  }

  setUserPushData = (res:any , err:any)=>{
    if(res.user.data){
      this.setState({ 
        pushed_Data: res.user.data, 
        loading: false 
      }) 
    }else{
      this.apiErr(err)
    }
  }

  setUserPostData = (res:any , err:any) =>{
    if(res){
      this.setState({
        pushed_posts:res.post.data,
        loading: false 
      })
    }else{
      this.apiErr(err)
    }
  }

  setLeaderBoarData = (res:any , err:any)=>{
    if (res.data) {
      this.setState({ detail_players: res.data, loading: false }) 
    }else{
      this.apiErr(err)
    }
  }

  setFrndList = (res:any , err:any) =>{
    if(res.data){
      this.setState({ friendList: res.data, loading: false }) 
    }else{
      this.apiErr(err)
    }
  }

  setWavPosts = (res:any , err:any)=>{
    if (res) {
      let pinnedData:Postprops[] = res.pinned.data
      let postData:Postprops[] = res.post.data
      let mergedData:Postprops[] = [...pinnedData , ...postData]
      this.setState({ post_data: mergedData, loading: false }) 
    }else{
      this.apiErr(err)
    }
  }

  setReact=(res:any , err:any)=>{
    if (res){
      this.setState({
        loading:false
      } , ()=> this.state.reactedFrom === 'Waves' ? this.getWavsPost() : this.pushedData())
    }else{
      this.apiErr(err)
    }
  }

  reactPost = (action:string , postId:string , from:string)=>{
    let isLiked:boolean = action === "like" ? true : false;
    const header = {
      token: this.state.token,
    };

    this.setState({
      loading:true,
      reactedFrom:from
    })
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postReactApi = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postReact
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    const formData = new FormData();

    formData.append("post_id", postId);
    formData.append("status", ""+isLiked);

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboardPostCall
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  getWavsPost() {
    
    this.setState({
      reactedFrom:""
    })

    const header = {
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.wavsPostData = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getWavsData
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }

  repostNavigation = ()=>{
    this.props.navigation.navigate("UserProfileBasicBlock")
  }

  setRepostItem = (item:Postprops) =>{
    this.setState({
      selectedPost:item
    } , ()=>this.toggleRepostModal())
  }

  toggleRepostModal = ()=>{
    this.setState({
      repostisVisible:!this.state.repostisVisible
    })
  }

  setSelectedRadio = (item:string)=>{
    this.setState({
      selected_radio:item
    })
  }

  getFrndList = ()=>{
    const header = {
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiFrndList = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getFrndList
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboarApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }

  openModal = (key:string , item:Postprops)=>{
    key === "admin" && this.setState({open_modal:true , modal_key:key , selectedPost:item})
    key === "user" && this.setState({open_modal:true , modal_key:key , selectedPost:item})
    key === "pushed" && this.setState({open_modal:true , modal_key:key , selectedPost:item})
  }
  
  shareData = async()=>{
      try {
        const result = await Share.share({
          title:this.state.selectedPost.attributes.user_profile_info_id.user_name,
          message:this.state.selectedPost.attributes.description
        });
        if(result.action){
          console.log(result);
        }
      } catch (error) {
        alert("Something went Wrong");
      }
  }

  sendWav = ()=>{
    this.setState({
      send_wav_modal:true
    })
  }

  pushedData = ()=>{
    this.setState({
      reactedFrom:""
    })
      const header = {
        token: this.state.token
      };
  
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.apiPushedData = requestMessage.messageId;
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.pushedData
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.dashboarApiMethodType
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return requestMessage.messageId;
  }

  leaderBoard = ()=>{
    
      const header = {
        token: this.state.token
      };
  
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.apiLeaderBoardData = requestMessage.messageId;
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.leaderBoard
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.dashboarApiMethodType
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return requestMessage.messageId;
  }
  // Customizable Area End

}
