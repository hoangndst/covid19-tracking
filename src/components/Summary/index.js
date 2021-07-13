import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import LineChart from '../Charts/LineChart'
import Map from '../Charts/Map'
export default function Summary({ report, selectedCountryID }) {
    const [mapData, setMapData] = React.useState({})

    useEffect(() => {
        if (selectedCountryID) {
            import(`@highcharts/map-collection/countries/${selectedCountryID}/${selectedCountryID}-all.geo.json`).then(res => setMapData(res));
        }
    }, [selectedCountryID])


    return (
        <div style={{ height: '500px', marginTop: 10 }}>
          <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
              <LineChart data={report} />
            </Grid>
            <Grid item sm={4} xs={12}>
                <Map mapData={mapData} />
            </Grid>
          </Grid>
        </div>
      );
}
