export default function storeUserInfo(username,email,loginToken,avatar,redirect){
    localStorage.setItem("username",username)
    localStorage.setItem("email",email)
    localStorage.setItem("token",loginToken)
    localStorage.setItem("avatar",avatar)
    redirect()
}