import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";
import Header from "./components/layout/Header";
import "./app.css";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
