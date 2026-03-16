import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Calculator from "./calculator"
export default function AppTabs() {
  return (
    <Tabs defaultValue="calculator" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="calculator">Calculator</TabsTrigger>
        <TabsTrigger value="converter">Currency Converter</TabsTrigger>
      </TabsList>
      <TabsContent value="calculator">
        <Calculator />
      </TabsContent>
      <TabsContent value="converter">curr</TabsContent>
    </Tabs>
  )
}
