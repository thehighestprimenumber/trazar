import {Stack, Switch, Typography} from "@mui/material";

export default function FieldValueSwitch({handleFieldValueChange}) {
    return <Stack direction="row" spacing={1} alignItems="center">
        <Typography>$</Typography>
        <Switch defaultChecked
                onClick={handleFieldValueChange} />
        <Typography>U</Typography>
      </Stack>
}