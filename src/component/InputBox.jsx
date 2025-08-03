import React from 'react'
import { countryList } from '../helper/codes';

function InputBox(
    {
        label,
        amount,
        selectedCurrency,
        onCurrencyChange,
        onAmountChange,
        currencyDisable = false,            //THIS IS FOR CONVERTED AMOUNT'S INPUT BOX
        placeholderData,
        flag_url
    }
) {

    const codes = Object.keys(countryList);
    // console.log(flag_url);
    

  return (
    <div>
        <div onSubmit={(e) => { e.preventDefault() }} className='md:p-5 p-2 w-full bg-gray-100 rounded-xl flex md:flex-row flex-col md:items-center items-start justify-between md:gap-9 gap-5'>
              <div className="part-1 md:w-1/2 w-full flex flex-col items-start md:gap-5 gap-2">
                <h1 className='text-2xl font-semibold'> {label} </h1>

                <input type="number" placeholder={placeholderData} 
                value={amount} 
                onChange={(e)=>{onAmountChange && onAmountChange(Number(e.target.value))}} 
                disabled={currencyDisable}
                className='border-b-2 border-b-gray-400 text-xl font-medium outline-none' />
              </div>

              <div className="part-2 flex flex-col md:items-end items-start md:gap-5 gap-2">
                <h1 className='md:text-xl text-2xl font-semibold'> Select  Currency </h1>
                <div className="select-div flex gap-2 items-center justify-between w-fit px-2 py-0.5 border-1 rounded-xl">
                  <img src={flag_url} alt="" className='w-8 rounded-xl' />

                  <select value={selectedCurrency} onChange={(e)=>{onCurrencyChange && onCurrencyChange(e.target.value)}} className='text-xl font-medium outline-none'>
                    {codes.map((code, index) => (
                      <option value={code} key={index}>
                        {code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
    </div>
  )
}

export default InputBox