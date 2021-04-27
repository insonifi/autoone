import clsx from "clsx";
import defaults from "lodash/fp/defaults";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";

import { useApi, useSearchParams } from "api";
import * as T from "types";

import Item from "components/Item";
import ItemSkeleton from "components/ItemSkeleton";
import Pagination from "components/Pagination";

const ensureResult = defaults({
  cars: [],
  totalPageCount: 0,
  totalCarsCount: 0,
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    list: {
      // marginTop: theme.spacing(1),
    },
    pending: {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.grey[200],
    },
    space: {
      flexGrow: 1,
    },
  })
);

export default function Results() {
  const classes = useStyles();
  const params = useSearchParams();

  const results = useApi["cars"](params);
  const { cars, totalPageCount: pages, totalCarsCount: total } = ensureResult(
    results
  );
  const count = cars.length;
  const isPending = count === 0;
  const classesPending = {
    root: clsx({ [classes.pending]: isPending }),
  };

  return (
    <Grid
      classes={{ root: classes.root }}
      container
      direction="column"
      spacing={1}
      wrap="nowrap"
    >
      <Grid container item>
        <Typography classes={classesPending} variant="h5">
          {isPending && (
            <FormattedMessage
              id="results.pending"
              defaultMessage="Results pending"
            />
          )}
          {!isPending && (
            <FormattedMessage
              id="results.title"
              defaultMessage="Available cars"
            />
          )}
        </Typography>
      </Grid>
      <Grid container item>
        <Typography classes={classesPending} gutterBottom variant="h6">
          <FormattedMessage
            id="results.count"
            defaultMessage="Showing {count} of {total} results"
            values={{ count, total }}
          />
        </Typography>
      </Grid>
      <Grid
        classes={{ root: classes.list }}
        container
        direction="column"
        item
        spacing={2}
      >
        {!isPending &&
          cars.map((item: T.Car) => (
            <Grid key={item.stockNumber} item>
              <Item {...item} />
            </Grid>
          ))}
        {isPending &&
          new Array(10).fill(0).map((_, i) => <ItemSkeleton key={i} />)}
      </Grid>
      <div className={classes.space} />
      <Pagination total={pages} {...params} />
    </Grid>
  );
}
