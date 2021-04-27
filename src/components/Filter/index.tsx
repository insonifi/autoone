import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import * as RT from "routes";
import FilterField from "components/FilterField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      alignSelf: "baseline",
      flexGrow: 0,
      margin: theme.spacing(4),
      padding: theme.spacing(4),
      width: theme.spacing(50),
    },
  })
);

export default function Filter() {
  const history = useHistory();
  const classes = useStyles();
  const execFilter = (e: React.SyntheticEvent<HTMLFormElement>) => {
    const {
      color: { value: color },
      manufacturer: { value: manufacturer },
    } = e.currentTarget;

    e.preventDefault();
    history.push({
      pathname: RT.SEARCH,
      search: `?color=${color}&manufacturer=${manufacturer}`,
    });
  };

  return (
    <Paper classes={{ root: classes.paper }} square variant="outlined">
      <form onSubmit={execFilter}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <FilterField name="color" />
          </Grid>
          <Grid item xs={12}>
            <FilterField name="manufacturer" />
          </Grid>
          <Grid container item justify="flex-end" xs={12}>
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
            >
              <FormattedMessage id="filter.submit" defaultMessage="Filter" />
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
