import { useState } from "react"
import { Button, buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"

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

      case sign === "x":
        result = parseFloat(left) * parseFloat(right)
        setValues((prev) => ({
          ...prev,
          leftOperand: String(result),
          rightOperand: "",
        }))
        return result

      case sign === "/":
        result = parseFloat(left) / parseFloat(right)
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

  function squareNumber(left: string, right: string) {}

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

      <div className="gap grid gap-1">
        <div className="grid grid-cols-4 gap-1 gap-y-1">
          <OperatorKey value="%" onPress={() => {}} />
          <OperatorKey value="CE" onPress={() => {}} />
          <OperatorKey value="C" onPress={() => {}} />
          <OperatorKey value="DEL" onPress={() => {}} />
        </div>
        <div className="grid grid-cols-4 gap-1 gap-y-1">
          <OperatorKey value="1/x" onPress={() => {}} />
          <OperatorKey
            value="^2"
            onPress={() => {
              if (!values.rightOperand && !values.sign) {
                const result = Math.pow(Number(values.leftOperand), 2)
                setValues((prev) => ({
                  ...prev,
                  leftOperand: `${result}`,
                }))
              } else {
                const result = Math.pow(Number(values.rightOperand), 2)
                setValues((prev) => ({
                  ...prev,
                  rightOperand: `${result}`,
                }))
              }
            }}
          />
          <OperatorKey
            value="x^3"
            onPress={() => {
              if (!values.rightOperand && !values.sign) {
                const result = Math.pow(Number(values.leftOperand), 3)
                setValues((prev) => ({
                  ...prev,
                  leftOperand: `${result}`,
                }))
              } else {
                const result = Math.pow(Number(values.rightOperand), 3)
                setValues((prev) => ({
                  ...prev,
                  rightOperand: `${result}`,
                }))
              }
            }}
          />
          <OperatorKey
            value="/"
            onPress={(value) => handleOperandKeyPress(value)}
          />
        </div>
        <div className="grid grid-cols-4 gap-1 gap-y-1">
          {numbers.slice(0, 3).map((number) => (
            <NumberKey
              key={number}
              value={number}
              onPress={(value) => handleNumberKeyPress(value)}
            />
          ))}

          <OperatorKey
            value="x"
            onPress={(value) => {
              handleOperandKeyPress(value)
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-1 gap-y-1">
          {numbers.slice(3, 6).map((number) => (
            <NumberKey
              key={number}
              value={number}
              onPress={(value) => handleNumberKeyPress(value)}
            />
          ))}
          <OperatorKey
            value="-"
            onPress={(value) => {
              handleOperandKeyPress(value)
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-1 gap-y-1">
          {numbers.slice(6, 9).map((number) => (
            <NumberKey
              key={number}
              value={number}
              onPress={(value) => handleNumberKeyPress(value)}
            />
          ))}
          <OperatorKey
            value="+"
            onPress={(value) => {
              handleOperandKeyPress(value)
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-1 gap-y-1">
          <OperatorKey value="+/-" onPress={() => {}} />
          <NumberKey
            value={0}
            onPress={(value) => handleNumberKeyPress(value)}
          />
          <OperatorKey value="." onPress={() => {}} />
          <OperatorKey variant={"default"} value="=" onPress={() => {}} />
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
    <div className="flex h-8 items-center justify-end gap-1 rounded-lg">
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
      <Preview
        leftOperand={leftOperand}
        rightOperand={rightOperand}
        sign={sign}
      />
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

function OperatorKey({
  value,
  onPress,
  className,
  variant = "outline",
}: {
  value: string
  onPress: (value: string) => void
  className?: string
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  return (
    <Button
      onClick={() => onPress(value)}
      variant={variant}
      size={"lg"}
      className={cn("h-14 text-2xl", className)}
    >
      {value}
    </Button>
  )
}
