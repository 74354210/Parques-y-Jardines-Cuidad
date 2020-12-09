import React from 'react' 
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"

import useForm from "../hooks/useForm"

const { height, width } = Dimensions.get('screen')

export default ({ navigation }) => {

    const initialState={
        US_Nombres: '',
        US_Apellidos: '',
        US_Direccion: 'null',
        US_Fecha_Nacimiento: '2020-02-01 00:00:00',
        US_Nacionalidad: 'peruana',
        US_Telefono: 'null',
        US_Email: '',
        US_Contrasena: '',
        US_Tipo: '1',
    }

    const onSubmit = (values) =>{
        fetch('http://smartcityhyo.tk/api/Usuario/Insert_Usuario.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(values),
        })
            .then(x=> x.text())
            .then(x=>{
                try{
                    return JSON.parse(x) 
                    
                }catch{
                    throw x
                }
            })
            .then(x => {
                console.log(x)

                if(x.message == "Error, datos incompletos"){
                    Alert.alert('Oops!', 'Uno o varios campos no están rellenados, por favor ingrese los datos')
                } else if(x.message == "Error en la solicitud"){
                    Alert.alert('Lo sentimos!', 'Ese correo electrónico ya está registrado, por favor ingrese otro correo electrónico')
                }
                else{
                    Alert.alert(
                        'Exelente!',
                        'Gracias por registrarte en SmartCity!',
                        [
                            {text: 'Iniciar Sesión', onPress: () => navigation.navigate('Login') }
                            
                        ]
                    )
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
                    REGÍSTRATE
                </Text>

                <View style={ styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        value={inputs.US_Nombres}
                        onChangeText={subscribe('US_Nombres')}  
                        placeholder="Nombres" 
                        placeholderTextColor="#aaa"
                    />
                    <TextInput 
                        style={styles.input}
                        value={inputs.US_Apellidos}
                        onChangeText={subscribe('US_Apellidos')}  
                        placeholder="Apellidos" 
                        placeholderTextColor="#aaa"
                    />
                    <TextInput 
                        style={styles.input}
                        value={inputs.US_Email}
                        onChangeText={subscribe('US_Email')}  
                        autoCapitalize='none'
                        autoCompleteType='email'
                        placeholder="Email" 
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
                    />
                </View>

                <View style={{ alignItems: 'center'}}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.btnText}> 
                            Registrarse 
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', padding: 20}}>
                    <Text>¿Tienes una cuenta? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')} 
                    >
                        <Text 
                        style={{color: '#26C4F0'}}
                        >
                            Iniciar Sesión
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
