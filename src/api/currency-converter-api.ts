import { useQuery } from "@tanstack/react-query"

const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY

type Response = {
  result: string
  documentation: string
  terms_of_use: string
  time_last_update_unix: number
  time_last_update_utc: string
  time_next_update_unix: number
  time_next_update_utc: string
  base_code: string
  target_code: string
  conversion_rate: 0.8412
}
export async function convertCurrencies(base: string, target: string) {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${base}/${target}`
  )

  if (!response.ok) {
    throw Error("An error occurred while fetching")
  }

  const data = await response.json()
  return data as Response
}

export function useConvertedCurrency(base: string, target: string) {
  return useQuery({
    queryKey: ["exchange", base, target],
    queryFn: () => convertCurrencies(base, target),
    refetchOnWindowFocus: false,
    enabled: !!base && !!target,
  })
}
