import { Hero } from "../../components/marketing/Hero"
import { Services } from "../../components/marketing/Services"
import {HTW} from "../../components/marketing/HTW.tsx";

const Marketing = () => {
  return (
    <main className="w-full bg-background text-foreground">
      <Hero />
      <Services />
      <HTW />
  </main>
  )
}

export default Marketing
