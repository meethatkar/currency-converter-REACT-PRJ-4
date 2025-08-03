import { useEffect, useState } from 'react'

async function useCurrencyInfo(currency){
    const API_KEY = "0f0fb885e0fb4ed3effdae08";
    const API = "https://v6.exchangerate-api.com/v6/";
    const [data, setdata] = useState("")
    useEffect(()=>{
        fetch(`${API}${API_KEY}/latest/${currency}`).then(res=>res.json()).then(res=>setdata(res.conversion_rates));
        // console.log("function's res: ",data);
        
    }, [currency])
    return data;
}

export default useCurrencyInfo;