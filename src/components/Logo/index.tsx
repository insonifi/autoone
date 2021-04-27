import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useIntl } from "react-intl";

import logo from "images/logo.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: theme.spacing(20),
    },
  })
);

export default function Logo() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <img
      className={classes.logo}
      alt={intl.formatMessage({ id: "logo", defaultMessage: "Company Logo" })}
      src={logo}
    />
  );
}
