import React from "react";
import FlashTemplate from "../../../components/FlashTemplate";

export default function FlashScreen2({navigation}){

return(

<FlashTemplate

image={require("../../../assets/images/splash2.png")}

title="Your Doctor, On Your Time"

subtitle="Book appointments with experienced doctors whenever you need healthcare."

active={2}

buttonText="Next"

onNext={()=>navigation.navigate("FlashScreen3")}

onSkip={()=>navigation.replace("AuthScreenStack")}

/>

)

}