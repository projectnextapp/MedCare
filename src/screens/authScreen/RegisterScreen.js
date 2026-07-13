import React, { useState } from "react";

import {
View,
Text,
TextInput,
TouchableOpacity,
ActivityIndicator,
ScrollView,
Alert,
Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../redux/authSlice";

import styles from "./RegisterScreen.css";

const RegisterScreen = ({ navigation }) => {

const dispatch = useDispatch();

const {

loading,

error

}=useSelector(

state=>state.auth

);

const [fullname,setFullname]=useState("");

const [email,setEmail]=useState("");

const [phone,setPhone]=useState("");

const [dob,setDob]=useState("");

const [password,setPassword]=useState("");

const [confirmPassword,setConfirmPassword]=useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

const validateForm=()=>{

if(

!fullname ||

!email ||

!phone ||

!dob ||

!password ||

!confirmPassword

){

Alert.alert(

"Validation",

"Please fill all fields."

);

return false;

}

if(password!==confirmPassword){

Alert.alert(

"Validation",

"Passwords do not match."

);

return false;

}

if(password.length<8){

Alert.alert(

"Validation",

"Password must be at least 8 characters."

);

return false;

}

return true;

}

const handleRegister=async()=>{

if(!validateForm()) return;
console.log("Form validated successfully! Sending request..."); 
const result=await dispatch(

registerUser({

fullname,

email,

phone,

dob,

password

})

);

if(registerUser.fulfilled.match(result)){

Alert.alert(

"Success",

"Verification code sent to your email",

);

navigation.navigate(

// "VerifyOTP",
"LoginScreen",
{

email

}

);

}

}
return(

 <SafeAreaView style={{ flex: 1, backgroundColor: "#4880D8" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false} // Prevents pulling down and showing white space above the blue header
      >
    {/* 2. Top Header Area (Stays Blue) */}
        <View style={{ backgroundColor: "#4880D8", alignItems: 'center', justifyContent: 'center', paddingVertical: 25 }}>
          <Image 
    source={require('../../../assets/images/logo1.png')} 
    style={{ width: 88.5, height: 54.33 }} 
    resizeMode="contain" 
  />
 <Text style={{ fontWeight: 'bold', marginTop: 8, color: '#fff', fontSize: 18, letterSpacing: 1 }}>MEDCARE</Text>
        </View>

  {/* 3. Bottom Form Area (Stretches Downward in Ash Color) */}
        <View 
          style={{ 
            flex: 1, 
            backgroundColor: '#f5f5f5', // The Ash color
            borderTopLeftRadius: 25,    // Optional: rounds the top corners beautifully where it meets the blue
            borderTopRightRadius: 25,
            paddingHorizontal: 20,
            paddingTop: 30,
            paddingBottom: 40
          }}
        >
<Text style={styles.title}>

Create Account

</Text>

<TextInput

placeholder="Full Name"

style={styles.input}

value={fullname}

onChangeText={setFullname}

/>

<TextInput

placeholder="Email"

keyboardType="email-address"

autoCapitalize="none"

style={styles.input}

value={email}

onChangeText={setEmail}

/>

<TextInput

placeholder="Phone Number"

keyboardType="phone-pad"

style={styles.input}

value={phone}

onChangeText={setPhone}

/>

<TextInput

placeholder="YYYY-MM-DD"

style={styles.input}

value={dob}

onChangeText={setDob}

/>

<TextInput

placeholder="Password"

secureTextEntry={secureTextEntry}

style={styles.input}

value={password}

onChangeText={setPassword}

/>
<TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                style={styles.eyeIcon}
              >
                <MaterialCommunityIcons
                  name={secureTextEntry ? "eye-off" : "eye"}
                  size={22}
                  color="#4880D8"
                />
              </TouchableOpacity>

<TextInput

placeholder="Confirm Password"

secureTextEntry={secureTextEntry}

style={styles.input}

value={confirmPassword}

onChangeText={setConfirmPassword}

/>
<TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                style={styles.eyeIcon2}
              >
                <MaterialCommunityIcons
                  name={secureTextEntry ? "eye-off" : "eye"}
                  size={22}
                  color="#4880D8"
                />
              </TouchableOpacity>

{

error &&

<Text style={styles.error}>

{error}

</Text>

}
<TouchableOpacity

style={styles.button}

onPress={handleRegister}

disabled={loading}

>

{

loading ?

<ActivityIndicator color="#8b2929"/>

:

<Text style={styles.buttonText}>

Register

</Text>

}

</TouchableOpacity>

<TouchableOpacity

onPress={()=>navigation.navigate("Login")}



>

<Text style={styles.login}>

Already have an account? Login

</Text>

</TouchableOpacity>
</View>
</ScrollView>
</SafeAreaView>

);

};

export default RegisterScreen;