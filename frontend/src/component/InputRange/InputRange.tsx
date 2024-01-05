import { useState } from "react";
import "./InputRange.scss";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
export default function InputRange() {
  const [value, setValue] = useState<number>(50);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    console.log(value);
  };

  return (
    <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
      <Slider
        size="small"
        defaultValue={50}
        onChange={(e: any) => handleChange(e, e.target.value)}
        aria-label="Small"
        valueLabelDisplay="auto"
        color="primary"
      />
    </Stack>
  );
}
