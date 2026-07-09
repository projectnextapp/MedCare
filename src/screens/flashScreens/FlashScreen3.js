import React from "react";
import FlashTemplate from "../../../components/FlashTemplate";

export default function FlashScreen3({navigation}){

return(

<FlashTemplate

image={require("../../../assets/images/splash3.png")}

title="Manage Your Health With Ease"

subtitle="Appointments, prescriptions, reminders and medical records all in one secure place."

active={3}

buttonText="Get Started"

onNext={()=>navigation.replace("Login")}

onSkip={()=>navigation.replace("Login")}

/>

)

}