import MainPage from "./Pages/MainPage"
import LoginPage from "./Pages/LoginPage"
import SignUpPage from "./Pages/SignUpPage"
import GetStartedPage from "./Pages/GetStartedPage"
import CreateUserPage from "./Pages/CreateUserPage"
import authService from "../../Backend/auth"
import { useDispatch } from "react-redux";
import { login } from "../../Store/Slices/authSlice";

export default function App() {
  const dispatch=useDispatch()

  useEffect(()=>{
    const refillStore=async()=>{
      const user=await authService.getCurrentUser()
      if(user){
        dispatch(login(user))      
      }
    }

    refillStore()
  },[])
  return (
    <LoginPage/>
  )
}