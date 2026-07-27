import { HomeSection } from "./home-section";
import { Navbar } from "./navbar";

export function Home(){
    return(
      <div>
        <header><Navbar /></header>
        <section>
            <HomeSection />
        </section>
      </div>
    )
}