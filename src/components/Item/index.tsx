import startCase from "lodash/fp/startCase";
import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { Link } from "react-router-dom";

import * as RT from "routes";
import * as T from "types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // height: theme.spacing(11),
      padding: theme.spacing(1),
    },
    box: {
      height: "100%",
    },
    img: {
      backgroundColor: theme.palette.grey[200],
      height: "80%",
      objectFit: "contain",
      width: theme.spacing(12),
    },
    header: {
      backgroundColor: theme.palette.grey[200],
      height: theme.spacing(3),
      // marginTop: theme.spacing(1.5),
      width: theme.spacing(30),
    },
    desc: {
      backgroundColor: theme.palette.grey[200],
      height: theme.spacing(2),
      // marginTop: theme.spacing(0.5),
      width: theme.spacing(30),
    },
    link: {
      backgroundColor: theme.palette.grey[200],
      height: theme.spacing(2),
      // marginTop: theme.spacing(1.5),
      width: theme.spacing(12),
    },
  })
);

const SEP = " - ";

export default function Item({
  color,
  fuelType,
  manufacturerName,
  mileage,
  modelName,
  pictureUrl,
  stockNumber,
}: T.Car) {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.root }} square variant="outlined">
      <Grid container direction="row" wrap="nowrap" spacing={4}>
        <Grid alignItems="center" container item xs>
          <img className={classes.img} alt={modelName} src={pictureUrl} />
        </Grid>
        <Grid container direction="column" item>
          <Grid item>
            <Typography variant="h5">
              {manufacturerName} {modelName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="body2">
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
            <Typography variant="body2">
              <Link component={MuiLink} to={`${RT.DETAILS}/${stockNumber}`}>
                <FormattedMessage
                  id="item.details"
                  defaultMessage="View details"
                />
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
