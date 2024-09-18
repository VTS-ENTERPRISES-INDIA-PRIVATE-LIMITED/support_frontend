import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

const SLA = () => {
    const slaData = [
        {
          id: 1,
          contractLevel: 'High',
          metrics: [
            { name: 'Response Time', target: '1 hour', achieved: '95%' },
            { name: 'Resolution Time', target: '4 hours', achieved: '90%' },
            { name: 'Uptime', target: '99.9%', achieved: '99.8%' },
          ],
          penalties: '10% discount on next invoice if targets not met',
        },
        {
          id: 2,
          contractLevel: 'Medium',
          metrics: [
            { name: 'Response Time', target: '2 hours', achieved: '92%' },
            { name: 'Resolution Time', target: '8 hours', achieved: '85%' },
            { name: 'Uptime', target: '99.5%', achieved: '99.4%' },
          ],
          penalties: '5% discount on next invoice if targets not met',
        },
        {
          id: 3,
          contractLevel: 'Low',
          metrics: [
            { name: 'Response Time', target: '4 hours', achieved: '89%' },
            { name: 'Resolution Time', target: '24 hours', achieved: '80%' },
            { name: 'Uptime', target: '99%', achieved: '98.9%' },
          ],
          penalties: '2% discount on next invoice if targets not met',
        },
      ];
      
  return (
    <Box sx={{ flexGrow: 1, padding: '20px' }}>
      <Grid container spacing={2}>
        {slaData.map((sla) => (
          <Grid item xs={12} key={sla.id}>
            <Paper sx={{ padding: '15px', marginBottom: '10px', backgroundColor: '#f5f5f5' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {sla.contractLevel} Level Contract
              </Typography>
              <Typography variant="body1" sx={{ margin: '10px 0' }}>
                Penalties: {sla.penalties}
              </Typography>
              <Grid container spacing={2}>
                {sla.metrics.map((metric, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Paper sx={{ padding: '10px', backgroundColor: '#e0e0e0' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {metric.name}
                      </Typography>
                      <Typography variant="body2">Target: {metric.target}</Typography>
                      <Typography variant="body2">Achieved: {metric.achieved}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SLA;
