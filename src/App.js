import { Container, Typography } from '@material-ui/core';
import { sortBy } from 'lodash';
import { useEffect, useState } from 'react'
import { getCountries, getReportByCountry } from "./apis";
import Country from "./components/Country";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import moment from 'moment';
import '@fontsource/alata'
function App() {

  const [countries, setCountries] = useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState('');
  const [report, setReport] = useState([]);
  
  useEffect(() => {
    getCountries().then((res) => {
      console.log({ res });

      const countries = sortBy(res.data, 'Country');

      setCountries(countries);
      setSelectedCountryID('vn');
    });
  } , []);

  const handleOnChange = (event) => {
    setSelectedCountryID(event.target.value);
  }

  useEffect(() => {
    if (selectedCountryID) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryID
      );
      getReportByCountry(Slug).then((res) => {
        console.log('getReportByCountry', { res });
        // remove last item = current date
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [selectedCountryID, countries]);

  return (
    <Container>
    <Typography variant='h3' >
    Coronavirus COVID19
    </Typography>
    <Typography>{moment().format('MMMM Do YYYY, h:mm A')}</Typography> 
      <Country countries={countries} handleOnChange={handleOnChange} value={selectedCountryID} />
      
      <Highlight report={report} />
      <Summary report={report} selectedCountryID={selectedCountryID}/>
    </Container>
  );
}

export default App;
