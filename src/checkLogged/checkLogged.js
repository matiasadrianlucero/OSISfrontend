export default function checkLogged(){
    if(localStorage.getItem("token")){
        return true
    }
    return false
}
