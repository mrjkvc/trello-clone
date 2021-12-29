import "./App.css";
import RoutesDecl from "../routes/RoutesDecl";

function App() {
  console.log(process.env.REACT_APP_TRELLOCLONE_APP_KEY);
  return <RoutesDecl></RoutesDecl>;
}

export default App;
