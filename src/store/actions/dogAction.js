export const uploadDog = (payload) =>{
    return {
        type: "UPLOAD_DOG",
        payload,

   };
};
////Call Api
export const fetchRandomDog = () =>{
    ////function nhận 1 dispatch truyền vào
    return async (dispatch) =>{
        console.log("dispatch",dispatch)
        try {
            const res = await fetch("https://dog.ceo/api/breeds/image/random")
            const dataRes = await res.json();
            if(dataRes?.status === "success"){
                ///dispath upload data từ api
                dispatch(uploadDog(dataRes))
            }else{
                throw "error"
            }
        } catch (error) {
            dispatch(uploadDog(null))
        }
    }
}