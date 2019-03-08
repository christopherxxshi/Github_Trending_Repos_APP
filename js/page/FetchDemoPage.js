import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, TextInput} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";

type Props = {};
export default class FetchDemoPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        }
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(response => response.text())
            .then(responseText => {
                this.setState({
                    showText: responseText
                })
            })
    }
    loadData2() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(response => {
                if(response.ok){
                    return response.text()
                }
                throw new Error('No Response');
            })
            .then(responseText => {
                this.setState({
                    showText: responseText
                })
            })
            .catch(err=>{
                this.setState({
                    showText: err.toString()
                })
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}> FetchDemoPage!</Text>
                <View style = {styles.inputContainerStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={text => {
                            this.searchKey = text;
                        }}
                    />
                    <Button
                        title="Search"
                        onPress={() => {
                            this.loadData2()
                        }}/>
                </View>

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
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10
    },
    inputContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center'
    }
});

