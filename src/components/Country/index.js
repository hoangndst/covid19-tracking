import { FormControl, NativeSelect, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: `${theme.spacing(3)}px 0`,
    },
  }));


export default function Country({ value, handleOnChange, countries }) {
    
    const classes = useStyles();
    
    return (
        <FormControl style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className={classes.FormControl}>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: 'country',
                    id: 'country-selector'
                }}>
                {countries.map((country) => {
                    return <option key={country.ISO2} value={country.ISO2.toLowerCase()}>
                                {country.Country}
                            </option>
                })}
            </NativeSelect>
        </FormControl>
    )
}