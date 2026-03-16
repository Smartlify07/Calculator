import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Calculator from "./calculator"
import CurrencyConverter from "./currency-converter"
export default function AppTabs() {
  return (
    <Tabs defaultValue="calculator" className="w-sm border">
      <TabsList className="w-sm">
        <TabsTrigger value="calculator">Calculator</TabsTrigger>
        <TabsTrigger value="converter">Currency Converter</TabsTrigger>
      </TabsList>
      <TabsContent value="calculator">
        <Calculator />
      </TabsContent>
      <TabsContent value="converter">
        <CurrencyConverter />
      </TabsContent>
    </Tabs>
  )
}
