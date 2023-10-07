import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { Component } from 'react'
import { COLORS, FONTS } from '../../../../components/src/AppGlobals';
import { TransactionItem } from '../domain/gamification.dto';
import { imgPurchased, imgReceivedBlue, imgSentRed, imgSwitchTransaction } from '../assets';

export interface Props {
    transactions: TransactionItem[]
}

export default class Transactions extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    formatDate = (inputDate: string | number | Date) => {
        const date = new Date(inputDate);
        const formatter = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        const formattedDate = formatter.format(date);
        return formattedDate;
    };

    renderTransactions = (data: any) => {
        const { item, index } = data
        let image = imgSentRed;
        switch(item.attributes.type.status){
            case "Sent":{
                image = imgSentRed;
                break;
            }
            case "Received":{
                image = imgReceivedBlue;
                break;
            }
            case "Switched":{
                image = imgSwitchTransaction;
                break;
            }
            case "Purchased":{
                image = imgPurchased;
                break;
            }
        }
        return (
            <>
                <TouchableOpacity testID={`playersItem-${index}`} style={styles.touchapleTransactionItem}>
                    <View style={styles.viewTransactionItemInfo}>
                        <Image source={image}
                            style={styles.imgTransactionItem} />
                        <View>
                            <Text style={styles.textTransactionType}>
                                {item.attributes.type.status}: <Text style={styles.textTransactionMessage}>${item.attributes.type.type}</Text>
                            </Text>
                            <Text style={styles.textTransactionUserHeading}>
                                {item.attributes.type.type_of_transaction}: <Text style={styles.textTransactionUser}>{item.attributes.type.type_to}</Text>
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textTransactionAmount}>
                            {item.attributes.type.amount.toLocaleString("en-US")}
                        </Text>
                        <Text style={styles.textTransactionDate}>
                            {this.formatDate(item.attributes.created_at)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewTransactionHeader}>
                    <Text style={styles.textTransactionHeading}>Transactions</Text>
                    <Text style={styles.textThisWeek}>This Week</Text>
                </View>
                <View style={{paddingBottom:10,flex:1}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    testID="flatlistTransaction"
                    data={this.props.transactions}
                    renderItem={this.renderTransactions}
                    keyExtractor={(item: any) => item.id}
                    ListEmptyComponent={ListEmptyComponent()}
                />
                </View>
            </View>
        )
    }
}
function ListEmptyComponent() {
    return (
        <View style={styles.listEmptyFlatList}>
            {/* {(this.props.playerNotFound && this.props.loader === false) && */}
            <Text style={styles.textNoTransaction}>No Transactions Found</Text>
            {/* } */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        flex:1
    },
    viewTransactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    textTransactionHeading: {
        color: COLORS.textColor,
        fontSize: 20,
        fontFamily: FONTS.bold,

    },
    textThisWeek: {
        color: COLORS.textColorOffWhite,
        fontSize: 18
    },
    touchapleTransactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    viewTransactionItemInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imgTransactionItem: {
        height: 38,
        width: 38,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.textColorOffWhite,
        marginHorizontal: 5
    },
    textTransactionType: {
        color: COLORS.textColorOffWhite,
        fontSize: 18,
        fontFamily: FONTS.bold,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    textTransactionMessage: {
        color: COLORS.textColorBlue
    },
    textTransactionUserHeading: {
        color: COLORS.textColorOffWhite,
        fontFamily: FONTS.bold,
        fontSize: 15,
        paddingHorizontal: 10
    },
    textTransactionUser: {
        color: COLORS.textColor
    },
    textTransactionAmount: {
        color: COLORS.textColor,
        textAlign: 'right',
        fontSize: 18,
        paddingVertical: 8,
        paddingHorizontal: 5,
        fontFamily: FONTS.bold
    },
    textTransactionDate: {
        color: COLORS.textColorOffWhite,
        textAlign: 'right',
        fontFamily: FONTS.bold,
        paddingHorizontal: 5
    },
    listEmptyFlatList: {
        flex: 1,
        marginTop: 100,
        justifyContent: "center",
        alignSelf: "center",
    },
    textNoTransaction: {
        fontSize: 18,
        color: COLORS.textColor,
        textAlignVertical: "center",
    },
})