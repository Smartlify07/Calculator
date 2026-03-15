import { useState } from "react"
import { Button } from "./ui/button"

const numbers = [7, 8, 9, 6, 5, 4, 3, 2, 1, 0]
export default function Calculator() {
  const [values, setValues] = useState<{
    leftOperand: string
    sign: null | string
    rightOperand: string
  }>({
    leftOperand: "",
    rightOperand: "",
    sign: null,
  })

  console.log(values)
  function operate(left: string, sign: string, right: string) {
    let result = 0

    switch (true) {
      case sign === "+":
        result = parseFloat(left) + parseFloat(right)
        setValues((prev) => ({
          ...prev,
          leftOperand: String(result),
          rightOperand: "",
        }))
        return result
      case sign === "-":
        result = parseFloat(left) - parseFloat(right)
        setValues((prev) => ({
          ...prev,
          leftOperand: String(result),
          rightOperand: "",
        }))
        return result

      default:
        return 0
    }
  }

  function handleNumberKeyPress(number: number) {
    if (values.sign) {
      setValues((prev) => ({
        ...prev,
        rightOperand: prev.rightOperand + String(number),
      }))
    } else {
      setValues((prev) => ({
        ...prev,
        leftOperand: prev.leftOperand + String(number),
      }))
    }
  }

  function handleOperandKeyPress(sign: string) {
    if (!values.rightOperand) {
      setValues((prev) => ({
        ...prev,
        sign: sign,
      }))
    } else if (values.rightOperand && values.sign === sign) {
      operate(values.leftOperand, sign, values.rightOperand)
      setValues((prev) => ({
        ...prev,
        sign: sign,
      }))
    } else {
      operate(values.leftOperand, values.sign!, values.rightOperand)
      setValues((prev) => ({
        ...prev,
        sign: sign,
      }))
    }
  }

  return (
    <div className="flex w-sm flex-col gap-4">
      <MainDisplay
        leftOperand={values.leftOperand}
        rightOperand={values.rightOperand}
        sign={values.sign}
      />

      <div className="gap grid">
        <div className="grid grid-cols-4 gap-0.5">
          <NumberKey
            value={7}
            onPress={(value) => handleNumberKeyPress(value)}
          />
          <NumberKey value={8} onPress={() => {}} />
          <NumberKey value={9} onPress={() => {}} />
          <OperandKey
            value="X"
            onPress={(value) => {
              setValues((prev) => ({
                ...prev,
                sign: value,
              }))
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-0.5">
          <NumberKey value={6} onPress={() => {}} />
          <NumberKey value={5} onPress={() => {}} />
          <NumberKey value={4} onPress={() => {}} />
          <OperandKey
            value="-"
            onPress={(value) => {
              handleOperandKeyPress(value)
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-0.5">
          <NumberKey value={3} onPress={() => {}} />
          <NumberKey value={2} onPress={() => {}} />
          <NumberKey value={1} onPress={() => {}} />
          <OperandKey
            value="+"
            onPress={(value) => {
              handleOperandKeyPress(value)
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-0.5">
          <OperandKey value="+/-" onPress={() => {}} />
          <NumberKey value={0} onPress={() => {}} />
          <OperandKey value="." onPress={() => {}} />
          <OperandKey value="=" onPress={() => {}} />
        </div>
      </div>
    </div>
  )
}

function Preview({
  leftOperand,
  rightOperand,
  sign,
}: {
  leftOperand?: string
  rightOperand?: string
  sign: null | string
}) {
  return (
    <div className="flex h-8 items-center justify-end rounded-lg border ring ring-border">
      <p className="text-base font-medium text-muted-foreground">
        {leftOperand}
      </p>
      {sign && <p className="text-muted-foreground">{sign}</p>}
      {rightOperand && (
        <p className="text-base font-medium text-muted-foreground">
          {rightOperand}
        </p>
      )}
    </div>
  )
}

function MainDisplay({
  leftOperand,
  rightOperand,
  sign,
}: {
  leftOperand?: string
  rightOperand?: string
  sign: null | string
}) {
  return (
    <div className="flex h-20 flex-col items-end justify-end rounded-lg bg-muted px-2 py-2 ring ring-accent">
      {sign && (
        <Preview
          leftOperand={leftOperand}
          rightOperand={rightOperand}
          sign={sign}
        />
      )}
      {!rightOperand && <p className="text-3xl font-medium">{leftOperand}</p>}
      {rightOperand && <p className="text-3xl font-medium">{rightOperand}</p>}
    </div>
  )
}

function NumberKey({
  value,
  onPress,
}: {
  value: number
  onPress: (value: number) => void
}) {
  return (
    <Button
      onClick={() => onPress(value)}
      variant={"secondary"}
      size={"lg"}
      className="h-14 text-xl"
    >
      {value}
    </Button>
  )
}

function OperandKey({
  value,
  onPress,
}: {
  value: string
  onPress: (value: string) => void
}) {
  return (
    <Button
      onClick={() => onPress(value)}
      variant={"outline"}
      size={"lg"}
      className="h-14 text-xl"
    >
      {value}
    </Button>
  )
}
