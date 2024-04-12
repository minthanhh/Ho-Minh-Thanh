import axios from "axios"
import { useEffect, useState } from "react"


export const useCountries = <T,>(url: string) => {
    const [data, setData] = useState<T[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(url)
                const dataFilter = response.data.filter((item: any) => "currencies" in item)
                const dataCountries = dataFilter.map((item: any) =>  {
                    return { flag: item.flags.png, currency: Object.keys(item.currencies) }
                })
                console.log(response.data)
                setData(dataCountries)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [url])

    return [data, isLoading] satisfies [T[], boolean]
}