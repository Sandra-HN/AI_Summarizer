import Hero from "./components/Hero";
import Demo from "./components/Demo";

import "./App.css";
import { useState } from "react";
import TextSummary from "./components/TextSummary";

const App = () => {
  const [active, setActive] = useState("articles")

  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>

      <div className='app'>
        <Hero active={active} setActive={setActive} />
        {active==="articles"?<Demo />:<TextSummary/>}
      </div>
    </main>
  );
};

export default App;
