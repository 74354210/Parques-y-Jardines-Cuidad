import React from 'react' 
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"

import useForm from "../hooks/useForm"

const { height, width } = Dimensions.get('screen')

export default ({ navigation }) => {
    const initialState ={
        US_Email: '',
        US_Contrasena: '',
    }

    const onSubmit = (values) => {
        fetch('http://smartcityhyo.tk/api/Usuario/login.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(values),
        })
            .then(x => x.text())
            .then(x=>{
                try{
                    return JSON.parse(x) 
                    
                }catch{
                    throw x
                }
            })
            .then(x => {
                if(x.message == "Datos Incompletos"){
                    Alert.alert('Oops!', 'Uno o varios campos no están rellenados, por favor ingrese los datos')
                } 
                else if(x.message == "Usuario Incorrecto" ){
                    Alert.alert('Lo sentimos!', 'No pudimos encontrar al usuario al que quiera acceder, por favor revise los datos')
                }
                else{
                    Alert.alert('Bienvenido!', 'Hola!, Espero que disfrutes de SmartCity')
                    navigation.navigate('Parques')
                }
                
            })
            .catch(e => Alert.alert('Error', e))
    }

    const { subscribe, handleSubmit, inputs } = useForm (initialState, onSubmit)
    
    return (
        <View style={ styles.container }>

            <LinearGradient
                style={styles.linearGradient}
                colors={["#26C4F0","#6BDAF8"]}
            > 

            <View style={styles.registerContainer}>
                <Text
                    style={styles.title}
                >
                    INICIAR SESIÓN
                </Text>

                <View style={ styles.inputContainer}>
                   
                    <TextInput 
                        style={styles.input}
                        value={inputs.US_Email}
                        onChangeText={subscribe('US_Email')}  
                        autoCapitalize='none' 
                        placeholder="Correo Electrónico" 
                        placeholderTextColor="#aaa"
                    />
                    <TextInput 
                        style={styles.input}
                        value={inputs.US_Contrasena}
                        onChangeText={subscribe('US_Contrasena')}  
                        autoCapitalize='none'
                        secureTextEntry={true}
                        placeholder="Contraseña" 
                        placeholderTextColor="#aaa"
                        password viewPass 
                    />
                </View>

                <View style={{ alignItems: 'center'}}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.btnText}> 
                            Ingresar 
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', padding: 20}}>
                    <Text>¿Aún no tienes una cuenta? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')} 
                    >
                        <Text 
                        style={{color: '#26C4F0'}}
                        >
                            Regístrate
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    linearGradient:{
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        width: width,
    },

    registerContainer: {
        backgroundColor: "rgba(255,255,255,1)",
        padding: 20,
        borderRadius: 20,
        width: width /1.1,
        height: height / 1.7,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 20, 
        fontWeight: "bold", 
        textAlign: "center", 
        marginTop: 5
    },

    inputContainer:{
        marginTop: 8,
        marginBottom: 10
    },

    input:{
        fontSize: 16,
        borderWidth: 1.5,
        borderColor: "#aaa",
        borderRadius: 30,
        width: width / 1.2,
        padding: 8,
        paddingLeft: 23,
        marginVertical: 8,
    },

    button:{
        justifyContent: 'center',
        alignItems: 'center',
        width: width/2.3,
        height:  height/19.5,
        borderRadius: 30,
        backgroundColor: "#26C4F0",
    },

    btnText:{
        fontSize: 17,
        color: 'white',
    },

})
