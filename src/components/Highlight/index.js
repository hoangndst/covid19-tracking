import { Grid } from '@material-ui/core'
import React from 'react'
import HighlightCard from './HighlightCard';

export default function Highlight({ report }) {

    const data = report && report.length ? report[report.length - 1] : [];
    const summary = [
        {
            title: "Coronavirus Cases",
            count: data.Confirmed,
            type: "confirmed"
        },
        {
            title: "Recovered",
            count: data.Recovered,
            type: "recovered"
        },
        {
            title: "Deaths",
            count: data.Deaths,
            type: "deaths"
        }
    ]

    return (
        <div style={{ marginTop: 20 }}>
        <Grid container spacing={1}>
            { 
                summary.map(item => (
                <Grid item sm={4} xs={12} key={item.type}>
                <HighlightCard title={item.title} count={item.count} type={item.type} />
                </Grid>))
            }
        </Grid>
        </div>
    )
}
