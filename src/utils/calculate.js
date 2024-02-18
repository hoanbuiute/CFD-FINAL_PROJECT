export  const sumArray = (arr,initialValue=0) =>{
    return (
        arr?.reduce((curr,next)=>Number(curr) + Number(next),0) || 0
    )
}

// const newSubTotal = newTotalProduct.reduce(
//     (curr,next) => Number(curr) + Number(next),initialValue
//   ) || 0;