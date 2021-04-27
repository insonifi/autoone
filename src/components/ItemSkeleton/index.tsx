import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(13),
      margin: theme.spacing(1, 0),
    },
    phImg: {
      backgroundColor: theme.palette.grey[200],
      height: theme.spacing(10),
      margin: theme.spacing(1.5),
      marginRight: theme.spacing(4),
      width: theme.spacing(16),
    },
    phHeader: {
      backgroundColor: theme.palette.grey[200],
      height: theme.spacing(3),
      marginTop: theme.spacing(1.5),
      width: theme.spacing(30),
    },
    phDesc: {
      backgroundColor: theme.palette.grey[200],
      height: theme.spacing(2),
      marginTop: theme.spacing(0.5),
      width: theme.spacing(30),
    },
    phLink: {
      backgroundColor: theme.palette.grey[200],
      height: theme.spacing(2),
      marginTop: theme.spacing(1.5),
      width: theme.spacing(12),
    },
  })
);

export default function ItemSkeleton() {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.root }} variant="outlined">
      <Grid container direction="row" wrap="nowrap">
        <div className={classes.phImg} />
        <Grid container direction="column" item>
          <div className={classes.phHeader} />
          <div className={classes.phDesc} />
          <div className={classes.phLink} />
        </Grid>
      </Grid>
    </Paper>
  );
}
