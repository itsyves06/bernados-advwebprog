import { useRef } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from '@mui/x-data-grid';

// Define the palette from the provided image
const palette = {
  bg: '#F6F0D7',        // Light Beige
  lightGreen: '#C1D8A4', // Light Sage
  midGreen: '#9DB38B',   // Mid Sage
  darkGreen: '#829460',  // Dark Sage
  deepSage: '#6D8252'    // Deepest Sage
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

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

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Print Report</title>
        ${headMarkup}
        <style>
          @page { size: A4; margin: 16mm; }
          body { 
            margin: 0; 
            font-family: sans-serif; 
            background: ${palette.bg}; 
            color: ${palette.deepSage}; 
          }
          .report-shell { padding: 20px; }
          .report-header { 
            margin-bottom: 24px; 
            padding-bottom: 14px; 
            border-bottom: 2px solid ${palette.midGreen}; 
          }
          .report-header h1 { color: ${palette.darkGreen}; margin: 0; }
          .report-content .MuiCard-root { 
            background: #fff !important; 
            border: 1px solid ${palette.lightGreen}; 
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <main class="report-shell">
          <header class="report-header">
            <h1>Reports Summary</h1>
            <p>Prepared on ${exportedAt}</p>
          </header>
          <section class="report-content">
            ${printContent.outerHTML}
          </section>
        </main>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box sx={{ bgcolor: palette.bg, minHeight: '100vh', p: 4 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" sx={{ color: palette.darkGreen, fontWeight: 'bold' }}>
            Reports
          </Typography>
          <Typography variant="body1" sx={{ color: palette.deepSage }}>
            Analytics overview showing generated reports and completion performance.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          <Button variant="contained" sx={{ bgcolor: palette.darkGreen, '&:hover': { bgcolor: palette.deepSage } }}>
            Generate
          </Button>
          <Button variant="outlined" onClick={handlePrint} sx={{ color: palette.darkGreen, borderColor: palette.darkGreen }}>
            Export
          </Button>
          <Button variant="outlined" sx={{ color: palette.darkGreen, borderColor: palette.darkGreen }}>
            Filter
          </Button>
        </Stack>
      </Stack>

      <Stack ref={printRef} spacing={3}>
        <Card sx={{ borderLeft: `6px solid ${palette.darkGreen}` }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: palette.darkGreen }}>
              Monthly Report Output
            </Typography>
            <BarChart
              series={[
                { data: [18, 24, 20, 27], label: "Generated", color: palette.midGreen },
                { data: [12, 19, 17, 23], label: "Completed", color: palette.darkGreen },
              ]}
              height={300}
              xAxis={[{ data: ["Jan", "Feb", "Mar", "Apr"], scaleType: "band" }]}
            />
          </CardContent>
        </Card>

        <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: palette.darkGreen }}>
                Report Category Share
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PieChart
                  colors={[palette.lightGreen, palette.midGreen, palette.darkGreen, palette.deepSage]}
                  series={[{
                    data: [
                      { id: 0, value: 14, label: "Sales" },
                      { id: 1, value: 10, label: "Users" },
                      { id: 2, value: 8, label: "Inventory" },
                      { id: 3, value: 6, label: "Finance" },
                    ],
                    innerRadius: 30,
                  }]}
                  width={350}
                  height={200}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: palette.darkGreen }}>
                Completion Rate
              </Typography>
              <Box sx={{ minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Gauge 
                  width={150} 
                  height={150} 
                  value={70} 
                  sx={{
                    '& .MuiGauge-valueArc': { fill: palette.darkGreen },
                    '& .MuiGauge-referenceArc': { fill: palette.lightGreen },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Card>
          <CardContent sx={{ height: 400 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5]}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              sx={{
                border: 'none',
                '& .MuiDataGrid-columnHeaders': {
                  bgcolor: palette.lightGreen,
                  color: palette.deepSage,
                  fontWeight: 'bold'
                },
                '& .MuiDataGrid-cell:focus': { outline: 'none' },
              }}
            />
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ReportsPage;