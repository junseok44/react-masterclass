import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./coin";
import Coins from "./Coins";

function CoinRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:CoinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default CoinRouter;
