import { useEffect, useState } from 'react'
import './App.css'
import { countryList } from './helper/codes';
import useCurrencyInfo from './hooks/useCurrencyInfo';      //no curly braces cause it's the main default export.
import { CgArrowLongUpE,CgArrowLongDownE } from "react-icons/cg";
import InputBox from './component/InputBox';


function App() {
  const [toAmt, settoAmt] = useState("");
  const [fromAmt, setfromAmt] = useState("");
  const [toCurr, settoCurr] = useState("INR");
  const [fromCurr, setfromCurr] = useState("USD");
  const [toImgUrl, settoImgUrl] = useState("https://flagsapi.com/AE/flat/64.png");
  const [fromImgUrl, setfromImgUrl] = useState("https://flagsapi.com/AE/flat/64.png");

  const codes = Object.keys(countryList);
  function setToImgSrc(srcCode){
          let cc = countryList[srcCode];
          let flag_img = `https://flagsapi.com/${cc}/flat/64.png`
          settoImgUrl(flag_img);
          // console.log(cc);
      }
      function setFromImgSrc(srcCode){
          let cc = countryList[srcCode];
          let flag_img = `https://flagsapi.com/${cc}/flat/64.png`
          setfromImgUrl(flag_img);
          // console.log(cc);
      }

  // const [from, setfrom] = useState("usd")
  // console.log(codes);

  // useCurrencyInfo(from);

  // const selectChange = (data) => {
  //   setfrom(data);
  // }

  const resData = useCurrencyInfo(fromCurr);
  let mainData="";
  let convertedVal = "";
  
  function convert(){
    resData.then((data=>{
      // console.log(data);
      mainData = data;
      /*
      DEBUGGING STEPS
      console.log("frm amount: ",fromAmt);
      console.log("to: ",toCurr);
      console.log("from: ",fromCurr);
      let cur = "INR";
      console.log("to: ",mainData[toCurr]);
      console.log("from: ",mainData[fromCurr]);
      */
      settoAmt(fromAmt*mainData[toCurr]);
      
    }));    
  }

  function swap(){
    settoAmt(fromAmt);
    setfromAmt(toAmt);
    let temptoCurr = toCurr;
    settoCurr(fromCurr);
    console.log("to setted: ",toCurr);
    
    setfromCurr(temptoCurr);
    console.log("from setted : ",fromCurr);
    
    let tempFromUrl = fromImgUrl;
    setFromImgSrc(toImgUrl);
    settoImgUrl(tempFromUrl);
  }

  /*
  CAN USE LIKE THIS 
  useEffect(()=>{
    useCurrencyInfo(from);
  },[from])
  
  ERROR:--> 
  react-dom-client.development.js:5464 Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.
    at Object.throwInvalidHookError (react-dom-client.development.js:5464:13)
    at exports.useEffect (react.development.js:1187:25)
    at useCurrencyInfo (useCurrencyInfo.js:6:5)
    at App.jsx?t=1754137043027:36:5
    at Object.react_stack_bottom_frame (react-dom-client.development.js:23953:20)
    at runWithFiberInDEV (react-dom-client.development.js:1519:30)
    at commitHookEffectListMount (react-dom-client.development.js:11905:29)
    at commitHookPassiveMountEffects (react-dom-client.development.js:12026:11)
    at reconnectPassiveEffects (react-dom-client.development.js:14004:11)
    at recursivelyTraverseReconnectPassiveEffects (react-dom-client.development.js:13976:9)

    REASON:--> 
    The function you pass to useEffect (() => { ... }) is considered a nested function, and the React rules state that hooks can only be called at the top level of your function component.
    To fix this, you need to move the call to useCurrencyInfo out of the useEffect hook and place it directly inside the App component's body. Your custom hook already has a useEffect inside it to handle the API call, so you don't need a separate one in App.jsx.
  */

  return (
    <>
      <div className='bg-[url("https://images.unsplash.com/vector-1753165984715-d113f58b5494?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] h-screen w-screen object-cover opacity-50 '>
        <div id="bento-wrapper" className='p-[3.5px] absolute z-10 w-10/12  md:w-4/12 bg-gradient-to-r from-[#38BCC7] via-[#C23D87] to-[#C8DC23] shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden'>
          <div id="container" className='p-2 md:p-5 h-full w-full bg-green-200/90 rounded-xl text-green-900/90 flex flex-col items-center md:gap-5 gap-3'>
            <h1 className='text-2xl md:text-4xl font-bold md:font-semibold tracking-tight mb-4 border-dashed border-b-3 border-b-green-600'> CURRENCY CONVERTER </h1>
            <InputBox label="From" amount={fromAmt} onAmountChange={(amount)=>{setfromAmt(amount);console.log("from amt: ",amount);
            }} onCurrencyChange={(currency)=>{setfromCurr(currency); setFromImgSrc(currency)}} flag_url={fromImgUrl} placeholderData={"Enter Amount"}/>
            <div id="swap" className='w-fit py-2 flex items-center'>
              <CgArrowLongDownE className='text-4xl translate-y-[20%] md:text-5xl'/>
              <button className='px-3 py-2 bg-[#0350FC] text-white font-bold md:text-2xl text-lg rounded-xl mt-3' onClick={convert}> CONVERT </button>
              {/* <button className='px-3 py-1 text-2xl font-bold bg-green-600 text-green-100 rounded-xl' onClick={swap}>SWAP</button> */}
              <CgArrowLongUpE className='text-4xl translate-y-[20%] md:text-5xl'/>
            </div>
            <InputBox label="To" amount={toAmt} onAmountChange={(amount)=>{settoAmt(amount)}} onCurrencyChange={(currency)=>{settoCurr(currency); setToImgSrc(currency)}} flag_url={toImgUrl} currencyDisable={true} placeholderData={"Converter Value"}/>
            {/* <button className='px-3 py-1 bg-[#0350FC] text-white font-bold text-2xl rounded-xl mt-3' onClick={convert}> CONVERT </button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
