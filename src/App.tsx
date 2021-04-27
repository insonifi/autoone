import { makeStyles } from "@material-ui/core/styles";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import * as RT from "routes"; // TODO: maybe complete route descriptions mapped inside Switch make sense
import Details from "components/Details";
import Header from "components/Header";
import NotFound from "components/NotFound";
import Search from "components/Search";

const useStyles = makeStyles({
  "@global": {
    body: {
      height: "100%",
    },
    html: {
      height: "100%",
    },
    "#root": {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
  },
  main: {
    display: "flex",
    flexGrow: 1,
    overflowX: "hidden",
  },
});

function App() {
  const classes = useStyles();

  return (
    <Router>
      <Header />
      <div className={classes.main}>
        <Switch>
          <Redirect exact from="/" to={RT.SEARCH} />
          <Route strict path={RT.DETAILS_PATH}>
            <Details />
          </Route>
          <Route strict path={RT.SEARCH}>
            <Search />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
