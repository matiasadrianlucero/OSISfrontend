
export default function logout(){
    localStorage.removeItem("email")
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem("lastDate")
    localStorage.removeItem("profileUsername")
    localStorage.removeItem("avatar")

}