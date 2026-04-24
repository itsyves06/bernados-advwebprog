import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

function ReportsPage() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#7D8F69' }}>Reports</Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>Visualized data analysis and trends.</Typography>
      </Box>
      
      <Stack spacing={4}>
        <Paper sx={{ p: 4, borderRadius: '20px', border: '1px solid #C1D8A4', boxShadow: 'none' }}>
          <Typography variant="h6" sx={{ color: '#7D8F69', mb: 2 }}>Quarterly Performance Report</Typography>
          <Divider sx={{ mb: 2 }} />
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
            series={[
              { data: [15, 25, 45, 30], label: 'Income', color: '#7D8F69' },
              { data: [20, 15, 30, 25], label: 'Expenses', color: '#C1D8A4' },
            ]}
            height={300}
          />
        </Paper>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          <Paper sx={{ p: 3, flex: 1, borderRadius: '20px', border: '1px solid #C1D8A4', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ color: '#7D8F69', mb: 2 }}>Distribution</Typography>
            <PieChart
              series={[{ data: [{ value: 30, label: 'A', color: '#7D8F69' }, { value: 70, label: 'B', color: '#C1D8A4' }] }]}
              height={200}
            />
          </Paper>
          <Paper sx={{ p: 3, flex: 1, borderRadius: '20px', border: '1px solid #C1D8A4', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ color: '#7D8F69', mb: 2 }}>Monthly Trend</Typography>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 4, 5], scaleType: 'point' }]}
              series={[{ data: [2, 5, 3, 9, 6], color: '#7D8F69' }]}
              height={200}
            />
          </Paper>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ReportsPage;