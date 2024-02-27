import { useEffect, useState } from 'react'
import { Box, Button, Container, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { IWeatherForecast } from '../../DTO/Demo/IWeatherForecast'
import { usePostData } from '../../hooks/useHttp';

export default function FetchData_AppForm() {
  const [f_loading, setLoading] = useState(false);
  const [forecasts, setForecasts] = useState<IWeatherForecast[]>();
  const postData = usePostData();

  useEffect(() => {
    populateWeatherData();
  }, []);

  return (
    <Container>
      <Typography variant='h3'>天氣預報 Weather forecast</Typography>
      <Box>This component demonstrates fetching data from the server.</Box>
      <Button variant='contained' onClick={populateWeatherData} disabled={f_loading}>刷新</Button>

      {f_loading && <LinearProgress />}

      {forecasts && <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Temp. (C)</TableCell>
              <TableCell align="right">Temp. (F)</TableCell>
              <TableCell>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forecasts.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.date}</TableCell>
                <TableCell align="right">{item.temperatureC}</TableCell>
                <TableCell align="right">{item.temperatureF}</TableCell>
                <TableCell>{item.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </Container>
  );

  async function populateWeatherData() {
    try {
      setLoading(true)
      const data = await postData<IWeatherForecast[]>('api/weatherforecast')
      setForecasts(data)
    } catch (err) {
      console.error('populateWeatherData.err', err)
    } finally {
      setLoading(false)
    }
  }
}
