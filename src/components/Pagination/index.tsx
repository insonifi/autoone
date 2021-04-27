import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";

import * as RT from "routes";
import * as T from "types";
import NavLink from "components/NavLink";

type TProps = { total: number } & T.CarsParams;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 0),
    },
    pages: {
      margin: theme.spacing(0, 1),
    },
  })
);

export default function Pagination({ page = 1, total, ...common }: TProps) {
  const classes = useStyles();
  const pageCur = Number(page);
  const pageLast = Number(total);
  const isFirst = pageCur === 1;
  const isLast = pageCur === pageLast;
  const first =
    RT.SEARCH + "?" + new URLSearchParams({ ...common, page: (1).toString() });
  const previous =
    RT.SEARCH +
    "?" +
    new URLSearchParams({ ...common, page: (pageCur - 1).toString() });
  const next =
    RT.SEARCH +
    "?" +
    new URLSearchParams({ ...common, page: (pageCur + 1).toString() });
  const last =
    RT.SEARCH +
    "?" +
    new URLSearchParams({ ...common, page: pageLast.toString() });

  return (
    <Grid
      alignItems="center"
      classes={{ root: classes.root }}
      container
      justify="center"
      item
    >
      <NavLink disabled={isFirst} to={first}>
        <FormattedMessage id="results.first" defaultMessage="First" />
      </NavLink>
      <NavLink disabled={isFirst} to={previous}>
        <FormattedMessage id="results.previous" defaultMessage="Previous" />
      </NavLink>
      <Typography classes={{ root: classes.pages }}>
        <FormattedMessage
          id="results.pages"
          defaultMessage="Page {page} of {total}"
          values={{
            page,
            total,
          }}
        />
      </Typography>
      <NavLink disabled={isLast} to={next}>
        <FormattedMessage id="results.next" defaultMessage="Next" />
      </NavLink>
      <NavLink disabled={isLast} to={last}>
        <FormattedMessage id="results.last" defaultMessage="Last" />
      </NavLink>
    </Grid>
  );
}
