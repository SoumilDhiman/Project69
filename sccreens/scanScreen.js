import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
export default class ScanScreen extends React.Component {

    constructor() {
    
        super()
        this.state = {
    
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    
    getCameraPermissions = async() => {
    
          const {status} = await Permissions.askAsync(Permissions.CAMERA)
          this.setState({
    
            hasCameraPermissions:status==="granted",
            buttonState:'clicked'
          })
    }
    
    handleBarCodeScan = async({type,data}) => {
    
        this.setState({
    
            scaned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
        render() {
            const hasCameraPermissions = this.state.hasCameraPermissions
            const scanned = this.state.scanned
            const buttonState = this.state.buttonState
            if (buttonState==="clicked" && hasCameraPermissions) {
    
                return(
                    <BarCodeScanner 
                    onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScan}
                    style = {StyleSheet.absoluteFillObject}
                    />
                )
            }
    
            else if (buttonState==="normal") {
    
            return(
                <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style = {styles.displayText}>
                        hasCameraPermissions===true ? this.state.scannedData: "request camera permission"
                    </Text>
                    <TouchableOpacity style = {styles.scanButton}
                    onPress = {this.getCameraPermissions}
                    >
                        <Text> Scan QR Code </Text>
                    </TouchableOpacity>
                </View>
            )
            }
        }
    }
    
    const styles = StyleSheet.create({
    
        scanButton:{
            backgroundColor:'green',
            padding:10,
            margin:10
        },
        displayText:{
    
            fontSize:15,
            textDecorationLine:'underline'
        }
    })