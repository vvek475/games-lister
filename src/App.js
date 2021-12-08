import Home from "./pages/home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Info from "./pages/info";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/info/:id" exact component={Info} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
