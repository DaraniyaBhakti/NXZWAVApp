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

export interface Categories {
    id: number;
    isSelected: boolean;
    name: string
}

export interface CategoriesResponse {
    id: string;
    type: string;
    attributes: {
        id: number,
        name: string
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
    categories: Categories[];
    selectedCategories: Categories[];
    searchCategory: string;
    loader: boolean;
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class AddCategoriesController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    apiGetProfileCategories: string = '';
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
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            getName(MessageEnum.AuthTokenDataMessage)
            // Customizable Area End
        ];

        this.state = {
            txtInputValue: "",
            txtSavedValue: "A",
            enableField: false,
            // Customizable Area Start
            categories: [],
            selectedCategories: [],
            searchCategory: "",
            loader: false
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

            if (apiRequestCallId === this.apiGetProfileCategories) {

                if (responseJson) {
                    const selectedCategory = this.props.navigation.getParam(configJSON.labelPostCreationData).categoriesList;
                    let categories = responseJson.data.map((item: CategoriesResponse) => {
                        return {
                            id: item.attributes.id,
                            name: item.attributes.name,
                            isSelected: selectedCategory.split(",").includes(item.attributes.id.toString()) ? true : false
                        }
                    })
                    this.setState({
                        categories: categories,
                        selectedCategories: categories.filter((category: { isSelected: boolean; }) => category.isSelected === true),
                        loader: false
                    })
                } else {
                    this.showAlert(
                        configJSON.errorTitle,
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

    getCategoriesList = () => {
        const header = {
            token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiZXhwIjoxNzE0NTYwMzkyfQ.Bvwagj_ftnjQ8B8rf3CJIkyabfc4yPMQ7lLubxqs2l4NvbRHLKTGGB-X7zEHVIe-9qQddyo5JkpivrdtpvuyXA"
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.apiGetProfileCategories = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getCategoriesApiEndpoint
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

    updateCategories = () => {
        let categoriesString = ""
        this.state.selectedCategories.forEach((item) => {
            categoriesString = categoriesString.concat(item.id + ",")
        })
        categoriesString = categoriesString.slice(0, -1)

        if (categoriesString.split(",").length > 3) {
            Alert.alert(configJSON.labelAlert);
        } else {
            const addCategories = this.props.navigation.getParam(configJSON.labelAddCategoriesData);
            addCategories(categoriesString);
            this.props.navigation.navigate(configJSON.labelEditWav)
        }
    };

    handleRemoveCategories = (index: number, categoryId: number) => {
        const newSelectedItems = [...this.state.selectedCategories];
        newSelectedItems.splice(index, 1);
        this.setState({ selectedCategories: newSelectedItems });

        let categories = this.state.categories.map((item: Categories, index: number) => {
            if (item.id === categoryId) {
                return {
                    ...item,
                    isSelected: false
                }
            }
            return item;
        })
        this.setState({ categories: categories, })
    };

    filterCategories = (list: Categories[]) => {
        return list.filter((item: Categories) =>
            item.name.toLowerCase().includes(this.state.searchCategory.toLowerCase())
        );
    };

    setSearchTag = (text: string) => {
        this.setState({ searchCategory: text })
    }

    async componentDidMount() {
        this.setState({ loader: true })
        this.getCategoriesList();
    }

    checkBoxOnPress = (categoryID: number) => {
        let categories = this.state.categories.map((item: Categories, index: number) => {
            if (categoryID === item.id) {
                return {
                    ...item,
                    isSelected: !this.state.categories[index].isSelected
                }
            }
            return item;
        })
        this.setState({ selectedCategories: categories.filter(category => category.isSelected === true), categories: categories, })
    };
    navigateToPostCreationScreen = () => {
        this.props.navigation.navigate(configJSON.labelEditWav)
    }
    // Customizable Area End
}