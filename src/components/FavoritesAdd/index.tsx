import clsx from "clsx";
import matches from "lodash/fp/matches";
import some from "lodash/fp/some";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import * as T from "types";
import { useFavs } from "api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    pending: {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.grey[200],
    },
    pendingBtn: {
      height: theme.spacing(4),
      width: theme.spacing(8),
    },
  })
);

export default function FavoritesAdd({ car }: { car: T.Car }) {
  const classes = useStyles();
  const [favorites, favAdd, favRemove] = useFavs();
  const hasFavorites = Boolean(favorites) && car;
  const isFavorite = some(matches(car), favorites);
  const add = React.useCallback(() => {
    favAdd(car);
  }, [car, favAdd]);
  const remove = React.useCallback(() => {
    favRemove(car.stockNumber);
  }, [car, favRemove]);
  const classesPending = {
    root: clsx({ [classes.pending]: !hasFavorites }),
  };

  return (
    <Paper classes={{ root: classes.root }} square variant="outlined">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography classes={classesPending}>
            {isFavorite ? (
              <FormattedMessage
                id="favorites.remove.desc"
                defaultMessage={`Car is added to favourites, click the button to remove it.`}
              />
            ) : (
              <FormattedMessage
                id="favorites.add.desc"
                defaultMessage={`If you like this car, click the button
 and save it in your collection of favourite itemes.`}
              />
            )}
          </Typography>
        </Grid>
        <Grid container justify="flex-end" item>
          {hasFavorites &&
            (isFavorite ? (
              <Button color="primary" onClick={remove} variant="contained">
                <FormattedMessage
                  id="favorites.remove"
                  defaultMessage="delete"
                />
              </Button>
            ) : (
              <Button color="primary" onClick={add} variant="contained">
                <FormattedMessage id="favorites.add" defaultMessage="Save" />
              </Button>
            ))}
          {!hasFavorites && (
            <div className={clsx(classes.pending, classes.pendingBtn)} />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
