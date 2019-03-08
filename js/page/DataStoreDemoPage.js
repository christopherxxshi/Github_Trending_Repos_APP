import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, TextInput} from 'react-native';
import DataStore from '../expand/dao/DataStore';

type Props = {};
const KEY = 'save_key'
export default class DataStoreDemoPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        }
        this.dataStore = new DataStore();
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataStore.fetchData(url)
            .then(data => {
                let showData = `first loaded time: ${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({showText: showData})
            })
            .catch(error=>{
                error&&console.log(error.toString())
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> DataStoreDemoPage!</Text>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => {
                        this.value = text;
                    }}
                />
                <Text onPress={() => {
                    this.loadData();
                }}>
                    fetch
                </Text>
                <Text>
                    {this.state.showText}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    inputStyle: {
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10
    },
    inputContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

