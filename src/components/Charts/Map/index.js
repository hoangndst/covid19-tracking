import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import highchartsMap from 'highcharts/modules/map'
import React, { useState, useEffect, useRef } from 'react'
import { cloneDeep } from 'lodash';

highchartsMap(Highcharts);

const initOptions = {
    chart: {
        borderWidth: 1,
        height: '500',
    },

    title: {
        text: 'Coronavirus Cases'
    },

    legend: {
        layout: 'horizontal',
        borderWidth: 0,
        backgroundColor: 'rgba(255,255,255,0.85)',
        align: 'right',
        verticalAlign: 'bottom',
        y: -10,
    },
    plotOptions: {
        mapline: {
            showInLegend: false,
            enableMouseTracking: false
        }
    },

    mapNavigation: {
        enabled: true
    },

    colorAxis: {
        min: 0,
        // type: 'logarithmic',
        // minColor: '#EEEEFF',
        // maxColor: '#000022',
        stops: [
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#B71525'],
            [1, '	#7A0826'],
        ],
    },

    // series: [{
    //     mapData: {},
    //     joinBy: ['hc-key', 'key'],
    // }]
    series: [{
        mapData: {},
        data: {},
        joinBy: ['hc-key', 'key'],
        name: 'Coronavirus Cases',
        tooltip: {
            valueSuffix: ' '    
        },
        borderWidth: 0.5,
        states: {
            hover: {
                color: '#1976d2'
            }
        }
    }]
};


export default function Map({ mapData }) {
    const [option, setOption] = useState({});
    const chartRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
            console.log({ mapData });
            const fakeData = mapData.features.map((feature, index) => ({
              key: feature.properties['hc-key'],
              value: index,
        }));


        setOption({
            ...initOptions,
            series: [{
                ...initOptions.series[0],
                mapData: mapData,
                data: fakeData,
            }]
        });
        if (!mapLoaded) setMapLoaded(true);
        }
    }, [mapData, mapLoaded])   
    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                mapData,
            });
        }
    }, [mapData]);
    

    if (!mapLoaded) return null; 
    return (
        <div>
           <HighchartsReact 
                highcharts={Highcharts}
                options={cloneDeep(option)}
                constructorType="mapChart"
                ref={chartRef}
           />
        </div>
    )
}
