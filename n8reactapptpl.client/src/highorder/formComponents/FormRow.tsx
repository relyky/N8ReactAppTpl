import { createContext } from "react";
import { Grid, GridSize, GridSpacing } from "@mui/material"
import { ResponsiveStyleValue } from "@mui/system"

export type FormRowFieldSize = [
  xs: boolean | GridSize,
  sm?: boolean | GridSize,
  md?: boolean | GridSize,
  lg?: boolean | GridSize,
  xl?: boolean | GridSize
]

interface FormRowProps {
  spacing?: ResponsiveStyleValue<GridSpacing>,
  gridSize: FormRowFieldSize,
}

const initProps: FormRowProps = {
  spacing: 2,
  gridSize: [12, 6, 4, 3]
}

export const FormRowContext = createContext<FormRowProps | null>(null);

export function FormRow(props: FormRowProps & { children?: React.ReactNode }) {
  return (
    <FormRowContext.Provider value={props}>
      <Grid container spacing={props?.spacing} >
        {props.children}
      </Grid>
    </FormRowContext.Provider>
  )
}

// 為元件屬性設定預設值
FormRow.defaultProps = initProps;
