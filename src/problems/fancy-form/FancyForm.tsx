import axios from 'axios'
import { useEffect, useState } from 'react'
import { useCountries, useDebounce } from './hooks'
import { Select } from './components'
import { Currency } from './types'

const FancyForm = () => {
    const [currencies, isLoading] = useCountries<Currency>('https://restcountries.com/v3.1/all')
    const [firstCurrency, setFirstCurrency] = useState<Currency>({ flag: 'https://flagcdn.com/w320/vn.png', currency: 'VND' })
    const [secondCurrency, setSecondCurrency] = useState<Currency>({ flag: 'https://flagcdn.com/w320/um.png', currency: 'USD' })
    const [amount, setAmount] = useState(0)
    const [resultCurrency, setResultCurrency] = useState(0)
    const [isLoadingDebouce, setIsLoadingDebouce] = useState(false)
    const searchQuery = useDebounce(amount, 500)

    const handleSwapCurrency = () => {
        setFirstCurrency(secondCurrency)
        setSecondCurrency(firstCurrency)
    }

    useEffect(() => {
        if (searchQuery) {
            ;(async () => {
                setIsLoadingDebouce(true)
                const response = await axios.get('https://api.currencyapi.com/v3/latest', {
                    params: {
                        apikey: 'cur_live_Oi1HSxMbpwrWBtgJryhKgLNt869xkPIGysnXGx2i',
                        base_currency: firstCurrency.currency,
                        currencies: secondCurrency.currency,
                    },
                })
                setIsLoadingDebouce(false)
                setResultCurrency(response.data.data[secondCurrency.currency]?.value)
            })()
        }
    }, [searchQuery, firstCurrency.currency, secondCurrency.currency])

    return (
        <div className="shadow-md bg-white rounded-xl h-auto p-6 flex">
            <div className="flex items-center gap-5 relative w-[750px]">
                <div className="border-[#ecedee] border rounded-xl px-6 py-3 w-[calc(50%_-_10px)] flex justify-between">
                    <div className="flex flex-col w-[180px]">
                        <label htmlFor="from" className="text-gray-400 font-medium text-base select-none">
                            You Send
                        </label>
                        <input
                            onChange={(e) => setAmount(Number(e.target.value))}
                            id="from"
                            type="number"
                            placeholder="1.00"
                            className="text-[#121421] bg-transparent text-3xl font-semibold w-auto appearance-none outline-none"
                        />
                    </div>
                    <Select currencies={currencies} isLoading={isLoading} setCurrency={(data: { currency: string; flag: string }) => setFirstCurrency(data)} currency={firstCurrency} />
                </div>
                <div className="border-[#ecedee] border rounded-xl px-6 py-3 w-[calc(50%_-_10px)] flex justify-between">
                    <div className="flex flex-col w-[180px]">
                        <label htmlFor="" className="block text-gray-500 select-none">
                            Recipient Gets
                        </label>
                        <span className="text-[#121421] font-semibold outline-none bg-transparent text-3xl w-auto appearance-none">
                            {new Intl.NumberFormat(undefined, { style: 'currency', currency: secondCurrency.currency }).format(resultCurrency * amount)}
                        </span>
                    </div>
                    <Select currencies={currencies} isLoading={isLoading} setCurrency={(data: { currency: string; flag: string }) => setSecondCurrency(data)} currency={secondCurrency} />
                </div>
                <button
                    onClick={handleSwapCurrency}
                    className="rounded-full hover:bg-[#25262d] absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 shadow-sm transition-colors ease-in-out duration-150 bg-[#121421] text-white p-4">
                    {isLoadingDebouce ? (
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    )
}

export default FancyForm
