import React, { useEffect, useState } from "react";
import {
    Dialog, DialogContent, DialogTitle, IconButton, Box, DialogActions,
    Button, FormControl, Grid, FilledInput, Paper, Stack, Typography, Popover, InputAdornment, Snackbar
}
    from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { Close } from "@mui/icons-material";
import { useNewHabitContext } from "../../contexts/new-habit";
import { SketchPicker } from "react-color";
import dynamic from 'next/dynamic';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const allDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const weekDays = ["mon", "tue", "wed", "thu", "fri"];
const initialValues = { habitName: "", habitDescription: "" };
const initialEmoji = { "unified": "1f60a", "emoji": "😊", "originalUnified": "1f60a", "names": ["smiling face with smiling eyes", "blush"] };
const NewHabitDialog = () => {
    const { showDialog, handleDialogClose, createNewHabit, updateHabit, loadHabits,
        formInitialValues } = useNewHabitContext();
    const [selectedDays, setSelectedDays] = useState([]);
    const [weekDay, setWeekDay] = useState(false);
    const [everyDay, setEveryDay] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#B8E986");
    const [formValues, setFormValues] = useState(initialValues);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElEmoji, setAnchorElEmoji] = useState(null);
    const [chosenEmoji, setChosenEmoji] = useState(initialEmoji);

    const [nameValid, setNameValid] = useState(true);
    const [frequencyValid, setFrequencyValid] = useState(true);
    const [descriptionValid, setDescriptionValid] = useState(true);
    const [colorValid, setColorvalid] = useState(true);
    const [snackOpen, setOpenSnack] = useState({open:false,message:""})
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    const handlePickerClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePickerClose = () => {
        setAnchorEl(null);
    };
    const openColorPicker = Boolean(anchorEl);
    const popupid = openColorPicker ? 'picker-popover' : undefined;

    const handleEmojiPickerClick = (event) => {
        setAnchorElEmoji(event.currentTarget);
    };

    const handleEmojuPickerClose = () => {
        setAnchorElEmoji(null);
    };

    const openEmojiPicker = Boolean(anchorElEmoji);
    const emojipopupid = openEmojiPicker ? 'emoji-popover' : undefined;

    const handleWeekDayClick = () => {
        if (weekDay) {
            setWeekDay(false);
            setSelectedDays([]);
        } else {
            setEveryDay(false);
            setWeekDay(true);
            setSelectedDays(weekDays);
        }
    }

    const handleAllDayClick = () => {
        if (everyDay) {
            setEveryDay(false);
            setSelectedDays([]);
        } else {
            setWeekDay(false);
            setEveryDay(true);
            setSelectedDays(allDays);
        }
    }

    const handleDayClick = (day) => {
        setWeekDay(false);
        setEveryDay(false);
        const activeIndex = selectedDays.indexOf(day);
        if (activeIndex > -1) {
            const updatedActiveDays = selectedDays.slice();
            updatedActiveDays.splice(activeIndex, 1);
            setSelectedDays(updatedActiveDays);
        } else {
            setSelectedDays(prevState => ([...prevState, day]));
        }
    }

    const handleValueChange = (e) => {
        setFormValues(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleChangeComplete = (color) => {
        setSelectedColor(color.hex);
    };

    const handleFormSubmit = e => {
        const newHabit = {
            ...formValues,
            color: selectedColor,
            days: selectedDays,
            weekDays: weekDay,
            everyDay: everyDay,
            emoji: chosenEmoji
        };
        let formValid = true;

        if (newHabit.habitName && newHabit.habitName.trim()) {
            setNameValid(true);
        } else {
            setNameValid(false);
            formValid = false;
        }
        if (newHabit.habitDescription && newHabit.habitDescription.trim()) {
            setDescriptionValid(true);
        } else {
            setDescriptionValid(false);
            formValid = false;
        }
        if (newHabit.days.length) {
            setFrequencyValid(true);
        } else {
            setFrequencyValid(false);
            formValid = false;
        }
        if (newHabit.color === "#ffffff") {
            setColorvalid(false);
            formValid = false;
        } else {
            setColorvalid(true);
        }

        if (!formValid) {
            return;
        }
        if (formInitialValues !== null) {
            updateHabit({ _id: formInitialValues._id, updatedData: newHabit }, () => {
                loadHabits();
                setOpenSnack({open:true,message:"Habit updated!!!"});
            });
        } else {
            createNewHabit(newHabit, () => {
                loadHabits();
                setOpenSnack({open:true,message:"Habit added!!!"});
            });
        }
    }
    const handleSnackClose = () => {
        setOpenSnack({open:false,message:""});
    };

    useEffect(() => {
        setFormValues(initialValues);
        setSelectedDays([]);
        setWeekDay(false);
        setEveryDay(false);
        setSelectedColor("#B8E986");
        setChosenEmoji(initialEmoji);
        setNameValid(true);
        setFrequencyValid(true);
        setDescriptionValid(true);
        setColorvalid(true);
    }, [showDialog]);

    useEffect(() => {
        if (formInitialValues !== null) {
            setFormValues({ habitName: formInitialValues.habitName, habitDescription: formInitialValues.habitDescription });
            setSelectedDays(formInitialValues.days);
            setWeekDay(formInitialValues.weekDays);
            setEveryDay(formInitialValues.everyDay);
            setSelectedColor(formInitialValues.color);
            setChosenEmoji(formInitialValues.emoji);
        }
    }, [formInitialValues]);

    return (<>
        <Dialog open={showDialog} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        New Habit
                    </Box>
                    <Box>
                        <IconButton onClick={handleDialogClose}>
                            <Close />
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box component="form" autoComplete="off" py={2} onSubmit={(e) => { e.preventDefault() }}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Typography variant="body1" className="mb-1">Name this habit</Typography>
                            <FormControl fullWidth className="mb-2" variant="outlined">
                                <FilledInput
                                    id="hb-name"
                                    name="habitName"
                                    value={formValues.habitName}
                                    onChange={handleValueChange}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-describedby={emojipopupid}
                                                onClick={handleEmojiPickerClick}
                                            >
                                                {chosenEmoji ? chosenEmoji.emoji :
                                                    <div dangerouslySetInnerHTML={{ __html: "&#x1f60a" }}></div>
                                                }
                                            </IconButton>
                                            <Popover
                                                id={emojipopupid}
                                                open={openEmojiPicker}
                                                anchorEl={anchorElEmoji}
                                                onClose={handleEmojuPickerClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}>
                                                <EmojiPicker
                                                    onEmojiClick={onEmojiClick}
                                                    disableAutoFocus={true}
                                                    native
                                                />
                                            </Popover>
                                        </InputAdornment>
                                    }
                                />
                                {
                                    !nameValid &&
                                    <Typography variant="caption" color="error">Habit name is required</Typography>
                                }

                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="body1" className="mb-1">Color</Typography>
                            <Paper
                                elevation={3}
                                className="hb-picker-card"
                                aria-describedby={popupid}
                                style={{ backgroundColor: selectedColor, border: "4px solid #fff", borderRadius: "6px" }}
                                onClick={handlePickerClick}
                            />
                            {
                                !colorValid &&
                                <Typography variant="caption" color="error">White color is not accepted</Typography>
                            }
                            <Popover
                                id={popupid}
                                open={openColorPicker}
                                anchorEl={anchorEl}
                                onClose={handlePickerClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}>
                                <SketchPicker
                                    color={selectedColor}
                                    onChangeComplete={handleChangeComplete}
                                />
                            </Popover>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" className="mb-1">Habit frequency</Typography>
                            <Box mb={1}>
                                <Stack spacing={2} direction="row" >
                                    <Paper elevation={1}>
                                        <Box p={1}>
                                            <Stack spacing={1} direction="row">
                                                <Button
                                                    className={`btn-custom ${selectedDays.includes("mon") && "btn-active-bg"}`}
                                                    variant="text"
                                                    size="small" color="info"
                                                    onClick={() => handleDayClick("mon")}
                                                >Mon</Button>
                                                <Button
                                                    className={`btn-custom ${selectedDays.includes("tue") && "btn-active-bg"}`}
                                                    variant="text"
                                                    size="small" color="primary"
                                                    onClick={() => handleDayClick("tue")}
                                                >Tue</Button>
                                                <Button
                                                    className={`btn-custom ${selectedDays.includes("wed") && "btn-active-bg"}`}
                                                    variant="text"
                                                    size="small" color="primary"
                                                    onClick={() => handleDayClick("wed")}
                                                >Wed</Button>
                                                <Button
                                                    className={`btn-custom ${selectedDays.includes("thu") && "btn-active-bg"}`}
                                                    variant="text"
                                                    size="small" color="primary"
                                                    onClick={() => handleDayClick("thu")}
                                                >Thu</Button>
                                                <Button
                                                    className={`btn-custom ${selectedDays.includes("fri") && "btn-active-bg"}`}
                                                    variant="text"
                                                    size="small" color="primary"
                                                    onClick={() => handleDayClick("fri")}
                                                >Fri</Button>
                                                <Button
                                                    className={`btn-custom ${selectedDays.includes("sat") && "btn-active-bg"}`}
                                                    variant="text"
                                                    size="small" color="primary"
                                                    onClick={() => handleDayClick("sat")}
                                                >Sat</Button>
                                                <Button
                                                    className={`btn-custom ${selectedDays.includes("sun") && "btn-active-bg"}`}
                                                    variant="text"
                                                    size="small" color="primary"
                                                    onClick={() => handleDayClick("sun")}
                                                >Sun</Button>
                                            </Stack>
                                        </Box>
                                    </Paper>
                                    <Paper elevation={1}>
                                        <Box p={1}>
                                            <Stack spacing={1} direction="row">
                                                <Button
                                                    className={`btn-custom ${weekDay && "btn-active-bg"}`}
                                                    variant="text"
                                                    size="small" color="primary"
                                                    onClick={handleWeekDayClick}
                                                >
                                                    Weekdays
                                                </Button>
                                                <Button
                                                    className={`btn-custom ${everyDay && "btn-active-bg"}`}
                                                    variant="text"
                                                    size="small" color="primary"
                                                    onClick={handleAllDayClick}
                                                >
                                                    Everyday
                                                </Button>
                                            </Stack>
                                        </Box>
                                    </Paper>
                                </Stack>
                                {
                                    !frequencyValid &&
                                    <Typography variant="caption" color="error">Select frequency</Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" className="mb-1">Description</Typography>
                            <FormControl variant="filled" fullWidth>
                                <FilledInput
                                    id="hb-description"
                                    multiline
                                    rows={4}
                                    name="habitDescription"
                                    value={formValues.habitDescription}
                                    onChange={handleValueChange}
                                />
                            </FormControl>
                            {
                                !descriptionValid &&
                                <Typography variant="caption" color="error">Description is required</Typography>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} variant="contained" color="primary">Cancel</Button>
                <Button onClick={handleFormSubmit} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
        <Snackbar open={snackOpen.open} autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }} onClose={handleSnackClose}>
            <Alert severity="success" onClose={handleSnackClose}>{snackOpen.message}</Alert>
        </Snackbar>
    </>
    )
}


export default NewHabitDialog


//https://github.com/ealush/emoji-picker-react#readme
//https://www.npmjs.com/package/emoji-picker-react
