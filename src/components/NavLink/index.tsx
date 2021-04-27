import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  to: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
      margin: theme.spacing(0, 1),
    },
    active: {
      color: theme.palette.primary.main,
    },
  })
);

export default function Link({ children, disabled, to }: Props) {
  const classes = useStyles();

  if (disabled) {
    return (
      <Typography className={classes.root} color="inherit">
        {children}
      </Typography>
    );
  }

  return (
    <NavLink
      activeClassName={classes.active}
      className={classes.root}
      component={MuiLink}
      exact
      to={to}
    >
      <Typography color="inherit">{children}</Typography>
    </NavLink>
  );
}
