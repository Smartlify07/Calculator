import { useConvertedCurrency } from "@/api/currency-converter-api"

export default function CurrencyConverter() {
  const { data } = useConvertedCurrency("USD", "GBP")
  console.log(data)
  return <div>CurrencyConverter</div>
}
