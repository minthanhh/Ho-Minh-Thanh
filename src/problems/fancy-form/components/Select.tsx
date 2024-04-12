import { useCallback, useState } from 'react'
import { Currency } from '../types'

interface SelectProps {
    currencies: Currency[]
    currency: Currency
    setCurrency: (currency: Currency) => void
    isLoading: boolean
}

export default function Select({ currencies, currency, setCurrency, isLoading }: SelectProps) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOptionsOpen(!isOptionsOpen)
    }, [isOptionsOpen])

    if (isLoading) {
        return <div className="w-[102px] animate-pulse h-[32px] rounded-md mt-auto bg-gray-100"></div>
    }

    return (
        <div className="relative flex items-end select-none pl-3">
            <div onClick={toggleOpen} className="flex items-center gap-2 hover:cursor-pointer">
                <img src={currency.flag} alt="" className="h-6 w-6 aspect-square rounded-full max-w-full flex-shrink" />
                <span className="block text-2xl font-bold">{currency.currency}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 -ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>

            {isOptionsOpen && (
                <div className="bg-white absolute rounded-md top-[120%] right-0 h-[290px] w-[130px] shadow-md overflow-x-hidden flex flex-col overflow-y-auto">
                    {currencies.map(({ currency, flag }, idx) => (
                        <button
                            onClick={() => {
                                setCurrency({ currency, flag })
                                toggleOpen()
                            }}
                            key={idx}
                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-200/90 transition-colors duration-150 ease-in">
                            <img src={flag} alt="" className="h-8 w-8 aspect-square rounded-full" />
                            <span className="font-bold text-base">{currency}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
