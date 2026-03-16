import { useConvertedCurrency } from "@/api/currency-converter-api"
import { Field, FieldGroup, FieldLabel } from "./ui/field"
import { CurrencySelect } from "./country-dropdown"
import { useEffect, useState } from "react"
import { Input } from "./ui/input"

type InputState = {
  from: { currency: null | string; amount: null | number }
  to: { currency: null | string; amount: null | number }
}
export default function CurrencyConverter() {
  const [input, setInput] = useState<InputState>({
    from: { currency: null, amount: null },
    to: { currency: null, amount: null },
  })
  const { data } = useConvertedCurrency(
    input.from.currency!,
    input.to.currency!
  )

  useEffect(() => {
    const rate = data?.conversion_rate
    setInput((prev) => ({
      ...prev,
      to: { ...prev.to, amount: (rate ?? 0) * input?.from.amount! },
    }))
  }, [
    input.from.currency,
    input.from.amount,
    input.to.currency,
    data?.conversion_rate,
  ])

  return (
    <div className="h-[452px] px-6">
      <div className="flex flex-col">
        <FieldGroup>
          <Field>
            <FieldLabel>From</FieldLabel>
            <CurrencySelect
              onValueChange={(value) => {
                console.log(value)
              }}
              onCurrencySelect={(value) => {
                setInput((prev) => ({
                  ...prev,
                  from: { ...prev.from, currency: value.code },
                }))
              }}
              name="currency"
              placeholder="Select currency"
              currencies="custom"
              variant="default"
            />
            <Input
              id="from"
              placeholder="0"
              onChange={(e) => {
                setInput((prev) => ({
                  ...prev,
                  from: { ...prev.from, amount: parseFloat(e.target.value) },
                }))
              }}
              required
            />
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel>To</FieldLabel>
            <CurrencySelect
              onValueChange={(value) => {
                console.log(value)
              }}
              onCurrencySelect={(value) => {
                setInput((prev) => ({
                  ...prev,
                  to: { ...prev.to, currency: value.code },
                }))
              }}
              name="currency"
              placeholder="Select currency"
              currencies="custom"
              variant="default"
            />
            <p>{input.to.amount}</p>
          </Field>
        </FieldGroup>
      </div>
    </div>
  )
}
