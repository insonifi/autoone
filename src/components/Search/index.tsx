import Grid from "@material-ui/core/Grid";

import Filter from "components/Filter";
import Results from "components/Results";

export default function Search() {
  return (
    <Grid component="main" container wrap="nowrap">
      <Filter />
      <Results />
    </Grid>
  );
}
