import React,{Suspense} from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage'
import CarDetails from './components/CarDetails'



function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div style={{  minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/cars/:id" component={CarDetails} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;