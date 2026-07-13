import api from "./api";

export const registerUser=(data)=>{

return api.post(

"/auth/register",

data

)

}

export const loginUser=(data)=>{

return api.post(

"/auth/login",

data

)

}

export const verifyOTP=(data)=>{

return api.post(

"/auth/verify-otp",

data

)

}

export const forgotPassword=(data)=>{

return api.post(

"/auth/forgot-password",

data

)

}

export const resetPassword=(data)=>{

return api.post(

"/auth/reset-password",

data

)
}