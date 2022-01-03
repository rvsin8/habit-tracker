import { Delete, Edit } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack } from "@mui/material";
import React from "react";
import { useNewHabitContext } from "../../contexts/new-habit";

const WeekTable = () => {
    const { habitsData, handleDialogOpen, deleteHabit, setFormInitialValues } = useNewHabitContext();

    const handleDeleteHabit = (id) => {
        deleteHabit({ _id: id });
    }

    const handleEditHabit = (habitData) => {
        setFormInitialValues(habitData);
        handleDialogOpen();
    }

    return (<>
        <TableContainer component={Paper}>
            <Table>
                <TableHead style={{ background: "#eee" }}>
                    <TableRow>
                        <TableCell align="center" style={{ width: 100 }}>Actions</TableCell>
                        <TableCell>Habit</TableCell>
                        <TableCell align="center" style={{ width: 80 }}>Mon</TableCell>
                        <TableCell align="center" style={{ width: 80 }}>Tue</TableCell>
                        <TableCell align="center" style={{ width: 80 }}>Wed</TableCell>
                        <TableCell align="center" style={{ width: 80 }}>Thu</TableCell>
                        <TableCell align="center" style={{ width: 80 }}>Fri</TableCell>
                        <TableCell align="center" style={{ width: 80 }}>Sat</TableCell>
                        <TableCell align="center" style={{ width: 80 }}>Sun</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        habitsData.map(habit => {
                            return (
                                <TableRow key={habit._id}>
                                    <TableCell>
                                        <Stack spacing={1} direction={"row"}>
                                            <IconButton onClick={() => { handleDeleteHabit(habit._id) }}>
                                                <Delete />
                                            </IconButton>
                                            <IconButton onClick={() => { handleEditHabit(habit) }}>
                                                <Edit />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                    <TableCell component="th" scope="row">{habit.emoji.emoji} {habit.habitName}</TableCell>
                                    <TableCell>
                                        <Paper className="hb-card" style={{ backgroundColor: habit.days.includes("mon") ? habit.color : "#fff" }} />
                                    </TableCell>
                                    <TableCell>
                                        <Paper className="hb-card" style={{ backgroundColor: habit.days.includes("tue") ? habit.color : "#fff" }} />
                                    </TableCell>
                                    <TableCell>
                                        <Paper className="hb-card" style={{ backgroundColor: habit.days.includes("wed") ? habit.color : "#fff" }} />
                                    </TableCell>
                                    <TableCell>
                                        <Paper className="hb-card" style={{ backgroundColor: habit.days.includes("thu") ? habit.color : "#fff" }} />
                                    </TableCell>
                                    <TableCell>
                                        <Paper className="hb-card" style={{ backgroundColor: habit.days.includes("fri") ? habit.color : "#fff" }} />
                                    </TableCell>
                                    <TableCell>
                                        <Paper className="hb-card" style={{ backgroundColor: habit.days.includes("sat") ? habit.color : "#fff" }} />
                                    </TableCell>
                                    <TableCell>
                                        <Paper className="hb-card" style={{ backgroundColor: habit.days.includes("sun") ? habit.color : "#fff" }} />
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}

export default WeekTable
// https://mui.com/api/table-container/
// https://www.tabnine.com/code/javascript/classes/%40material-ui%2Fcore/TableContainer
// https://www.youtube.com/watch?v=-3Ybk8VfFt4&ab_channel=AnthonySistilli
// https://github.com/rvsin8/COVID-19-DATA