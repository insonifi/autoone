import startCase from "lodash/fp/startCase";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { FormattedMessage, useIntl } from "react-intl";

import { TApiName, useApi } from "api";
import { Typography } from "@material-ui/core";
const PREFIX = "filter-field";

export default function FilterField({ name }: { name: TApiName }) {
  const list = useApi[name]();
  const id = `${PREFIX}-${name}`;
  const intl = useIntl();
  const hasOpts = Array.isArray(list);

  return (
    <>
      <InputLabel htmlFor={id}>
        <Typography gutterBottom>
          <FormattedMessage
            id={`filter.${name}`}
            defaultMessage={startCase(name)}
          />
        </Typography>
      </InputLabel>
      <Select
        disabled={!hasOpts}
        fullWidth
        native
        inputProps={{
          id,
          name,
        }}
        variant="outlined"
      >
        <option value="">
          {intl.formatMessage({
            id: `filter.${name}.all`,
            defaultMessage: `All ${name}s`,
          })}
        </option>
        {Array.isArray(list) &&
          list.map((item: any) => (
            <option key={item} value={item}>
              {startCase(item)}
            </option>
          ))}
      </Select>
    </>
  );
}
