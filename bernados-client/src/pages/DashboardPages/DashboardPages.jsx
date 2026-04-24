import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Gauge } from '@mui/x-charts/Gauge';
import { Typography, Card, CardContent, Paper, Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function DashboardPage() {
  const averageAge = (rows.reduce((s, r) => s + r.age, 0) / rows.length).toFixed(1);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#7D8F69' }}>Dashboard</Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>Overview and summary of users and metrics.</Typography>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Card sx={{ flex: 1, borderRadius: '20px', border: '1px solid #C1D8A4', boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="subtitle1" color="#7D8F69">Total Users</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>{rows.length}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, borderRadius: '20px', border: '1px solid #C1D8A4', boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="subtitle1" color="#7D8F69">Average Age</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>{averageAge}</Typography>
          </CardContent>
        </Card>
      </Stack>

      <Paper sx={{ p: 3, borderRadius: '20px', border: '1px solid #C1D8A4', mb: 4, boxShadow: 'none' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#7D8F69' }}>Quick Metrics</Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack direction="row" spacing={4} justifyContent="center">
          <Gauge width={140} height={140} value={65} sx={{ '& .MuiGauge-valueArc': { fill: '#7D8F69' } }} />
          <Gauge width={140} height={140} value={82} sx={{ '& .MuiGauge-valueArc': { fill: '#C1D8A4' } }} />
        </Stack>
      </Paper>

      <Paper sx={{ p: 0, borderRadius: '20px', overflow: 'hidden', border: '1px solid #C1D8A4', boxShadow: 'none' }}>
        <Box sx={{ height: 450, width: '100%' }}>
          <MapContainer center={[14.6042, 120.9943]} zoom={13} style={{ height: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[14.6042, 120.9943]}><Popup>NU Manila Campus</Popup></Marker>
          </MapContainer>
        </Box>
      </Paper>
    </Box>
  );
}

export default DashboardPage;