import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import * as RT from "routes";
import NavLink from "components/NavLink";
import Logo from "components/Logo";

const useStyles = makeStyles({
  separator: {
    margin: "auto",
  },
});
const SeparatorFlex = () => {
  const classes = useStyles();

  return <span className={classes.separator} />;
};

export default function Header() {
  return (
    <AppBar color="default" position="static" variant="outlined">
      <Toolbar>
        <Link to="/">
          <Logo />
        </Link>
        <SeparatorFlex />
        {/* TODO: Consider taking it out as Navigation component. */}
        <NavLink to={RT.PURCHASE}>
          <FormattedMessage id="nav.purchase" defaultMessage="Purchase" />
        </NavLink>
        <NavLink to={RT.ORDERS}>
          <FormattedMessage id="nav.orders" defaultMessage="My Orders" />
        </NavLink>
        <NavLink to={RT.SELL}>
          <FormattedMessage id="nav.sell" defaultMessage="Sell" />
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}
