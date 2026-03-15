import React from "react"
import { Button } from "./ui/button"

export default function Calculator() {
  return (
    <div className="flex w-sm flex-col gap-4">
      <ShowArea />

      <div className="gap grid">
        <div className="grid grid-cols-4 gap-0.5">
          <NumberKey value="7" onPress={() => {}} />
          <NumberKey value="8" onPress={() => {}} />
          <NumberKey value="9" onPress={() => {}} />
          <OperandKey value="X" onPress={() => {}} />
        </div>
        <div className="grid grid-cols-4 gap-0.5">
          <NumberKey value="6" onPress={() => {}} />
          <NumberKey value="5" onPress={() => {}} />
          <NumberKey value="4" onPress={() => {}} />
          <OperandKey value="-" onPress={() => {}} />
        </div>
        <div className="grid grid-cols-4 gap-0.5">
          <NumberKey value="3" onPress={() => {}} />
          <NumberKey value="2" onPress={() => {}} />
          <NumberKey value="1" onPress={() => {}} />
          <OperandKey value="+" onPress={() => {}} />
        </div>
        <div className="grid grid-cols-4 gap-0.5">
          <OperandKey value="+/-" onPress={() => {}} />
          <NumberKey value="0" onPress={() => {}} />
          <NumberKey value="." onPress={() => {}} />
          <OperandKey value="=" onPress={() => {}} />
        </div>
      </div>
    </div>
  )
}

function ShowArea() {
  return <div className="h-20 rounded-lg bg-muted ring"></div>
}

function NumberKey({ value, onPress }: { value: string; onPress: () => void }) {
  return (
    <Button
      onClick={onPress}
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
  onPress: () => void
}) {
  return (
    <Button
      onClick={onPress}
      variant={"outline"}
      size={"lg"}
      className="h-14 text-xl"
    >
      {value}
    </Button>
  )
}
