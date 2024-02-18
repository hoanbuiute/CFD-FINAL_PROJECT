import Cookies from "js-cookie";
import { STORAGE } from "../constants/storage";

export const localToken = {

    //Thêm Get
    get: ()=>JSON.parse(localStorage.getItem(STORAGE.token)), //vì sao có parse
    ////Sửa 
    set: (token)=>localStorage.setItem(STORAGE.token,JSON.stringify(token)),
    //// XOá
    remove: ()=>localStorage.removeItem(STORAGE.token),
    
}

export const cookieToken ={
      //Thêm Get
      get: ()=> JSON.parse(Cookies.get(STORAGE.token) === undefined ? null : Cookies.get(STORAGE.token)) ,//vì sao có parse
      ////Sửa 
      set: (token)=>Cookies.set (STORAGE.token,JSON.stringify(token)),
      //// XOá
      remove: ()=>Cookies.remove(STORAGE.token),
}

const tokenMethod = {
    get: () => {
    //   return localToken.get()
      return cookieToken.get();
    },
    set: (token) => {
      // console.log("token", token);
    //   localToken.set(token)
    cookieToken.set(token);
    },
    remove: () => {
    //   localToken.remove();
    cookieToken.remove();
    },
  };

  export default tokenMethod;