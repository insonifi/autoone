import clsx from "clsx";
import defaults from "lodash/fp/defaults";
import get from "lodash/fp/get";
import startCase from "lodash/fp/startCase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { useParams } from "react-router-dom";

import { useApi } from "api";
import FavoritesAdd from "components/FavoritesAdd";

const SEP = " - ";
const detailsDef = defaults({
  color: "",
  fuelType: "",
  manufacturerName: "",
  modelName: "…",
  mileage: { number: 0, unit: "" },
  pictureUrl: "",
  stockNumber: "",
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(2),
    },
    img: {
      backgroundColor: theme.palette.grey[200],
      height: theme.spacing(50),
      objectFit: "contain",
    },
    pending: {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.grey[200],
    },
  })
);

export default function Details() {
  const classes = useStyles();
  const params = useParams();
  const details = useApi["carsdetail"](get("stockNumber", params));
  const isPending = !Boolean(details);
  const classesPending = { root: clsx({ [classes.pending]: isPending }) };

  const {
    color,
    fuelType,
    manufacturerName,
    modelName,
    mileage,
    pictureUrl,
    stockNumber,
  } = detailsDef(details);

  return (
    <Grid container direction="column">
      <Grid alignContent="stretch" container direction="column" item>
        <img
          className={classes.img}
          alt={`${manufacturerName} ${modelName}`}
          src={pictureUrl}
        />
      </Grid>
      <Grid
        classes={{ root: classes.content }}
        container
        item
        justify="center"
        spacing={8}
        wrap="nowrap"
      >
        <Grid container direction="column" item spacing={2} xs={6}>
          <Grid item>
            <Typography classes={classesPending} variant="h4">
              {manufacturerName} {modelName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography classes={classesPending} gutterBottom variant="h6">
              <FormattedMessage
                id="item.stocknum"
                defaultMessage="Stock # {num}"
                values={{
                  num: stockNumber,
                }}
              />
              {SEP}
              <FormattedNumber value={mileage.number} unitDisplay="long" />{" "}
              {mileage.unit.toUpperCase()}
              {SEP}
              <FormattedMessage
                id={`item.fuelType.${fuelType}`}
                defaultMessage={startCase(fuelType)}
              />
              {SEP}
              <FormattedMessage
                id={`item.color.${color}`}
                defaultMessage={startCase(color)}
              />
            </Typography>
          </Grid>
          <Grid item>
            <Typography classes={classesPending}>
              <FormattedMessage
                id="item.disclaimer"
                defaultMessage={`This car is currently available and can be
 delivered soon as tomorrow morning. Please be aware that delivery times shown
 in this page are not definitive and may change due to bad weather conditions.`}
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <FavoritesAdd car={details} />
        </Grid>
      </Grid>
    </Grid>
  );
}
