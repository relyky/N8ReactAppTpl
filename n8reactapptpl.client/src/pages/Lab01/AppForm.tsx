import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Tab, Typography } from "@mui/material";
import TabPageA from "./TabPageA";
import TabPageB from "./TabPageB";
import TabPageC from "./TabPageC";

export default function Lab01_AppForm() {
  const [tabIdx, setTabIdx] = useState('1');

  return (
    <Container>
      <Typography variant='h3'>表單驗證實驗 </Typography>

      <TabContext value={tabIdx}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_, v) => setTabIdx(v)}>
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><TabPageA /></TabPanel>
        <TabPanel value="2"><TabPageB /></TabPanel>
        <TabPanel value="3"><TabPageC /></TabPanel>
      </TabContext>


    </Container>
  );
}
