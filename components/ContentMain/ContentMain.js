import React from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import NewHabitDialog from '../NewHabitDialog';
import WeekTable from '../WeeksTable';
import { useNewHabitContext } from '../../contexts/new-habit';

const ContentMain = ({ habits }) => {
  const { handleDialogOpen } = useNewHabitContext();

  return (
    <>
      <Typography variant="h5" color={'primary'}>
        Habits
      </Typography>
      <Box
        display="flex"
        my={2}
        justifyContent="left"
        alignItems="center"
        width={'100%'}
      >
        <Box flexGrow={1}>Summary</Box>
        <Box>
          <Button
            variant="contained"
            color="info"
            startIcon={<Add />}
            onClick={handleDialogOpen}
          >
            New Habit
          </Button>
        </Box>
      </Box>
      <Box>
        <WeekTable habits={habits} />
      </Box>
      <NewHabitDialog />
    </>
  )
}

export default ContentMain


// https://mui.com/components/typography/
// https://www.geeksforgeeks.org/material-ui-typography
// https://www.youtube.com/watch?v=OvPrUQ3gPtw&ab_channel=AnthonySistilli
// https://github.com/rvsin8/COVID-19-DATA/tree/master