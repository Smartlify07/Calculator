import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppTabs from "./components/app-tab"

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-svh items-center justify-center">
        <AppTabs />
      </div>
    </QueryClientProvider>
  )
}

export default App
