import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Logo from "components/Logo";

export default function NotFound() {
  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      justify="center"
      spacing={2}
    >
      <Grid item>
        <Logo />
      </Grid>
      <Grid item>
        <Typography variant="h3">
          <FormattedMessage
            id="notfound.header"
            defaultMessage="404 – Not Found"
          />
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          <FormattedMessage
            id="notfound.desc"
            defaultMessage="Sorry,the page you are Looking for does not exist."
          />
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          <FormattedMessage
            id="notfound.proposal"
            defaultMessage="You can always go back to the <a>homepage</a>"
            values={{
              a: (t: string) => (
                <Link component={MuiLink} to="/">
                  {t}
                </Link>
              ),
            }}
          />
        </Typography>
      </Grid>
    </Grid>
  );
}
