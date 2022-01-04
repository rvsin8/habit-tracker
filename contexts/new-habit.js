import React, { useState, useContext, createContext } from "react";

const newHabitContext = createContext({});
export function NewHabitProvider({ children }) {
    const habit = useNewHabit();
    return (
        <newHabitContext.Provider value={habit}>
            {children}
        </newHabitContext.Provider>
    );
}

export const useNewHabitContext = () => {
    return useContext(newHabitContext);
};

const useNewHabit = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [habitsData, setHabitsData] = useState([]);
    const [formInitialValues, setFormInitialValues] = useState(null);

    const handleDialogOpen = () => {
        setShowDialog(true);
    }
    const handleDialogClose = () => {
        setShowDialog(false);
        setFormInitialValues(null);
    }

    const createNewHabit = async (dataObj, cb) => {
        try {
            let res = await fetch(process.env.NEXT_PUBLIC_API_HOST + "habits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataObj)
            });
            let habits = await res.json();
            handleDialogClose();
            cb();
        } catch (error) {
            console.log(error);
        }
    }
    const updateHabit = async (dataObj, cb) => {
        try {
            let res = await fetch(process.env.NEXT_PUBLIC_API_HOST + "habits", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataObj)
            });
            let habits = await res.json();
            handleDialogClose();
            cb();
        } catch (error) {
            console.log(error);
        }
    }

    const loadHabits = async () => {
        try {
            let res = await fetch(process.env.NEXT_PUBLIC_API_HOST + "habits", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let habits = await res.json();
            setHabitsData(habits.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteHabit = async (dataObj, cb) => {
        try {
            let res = await fetch(process.env.NEXT_PUBLIC_API_HOST + "habits", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataObj)
            });
            let habits = await res.json();
            loadHabits();
        } catch (error) {
            console.log(error);
        }
    }

    return {
        showDialog,
        handleDialogOpen,
        handleDialogClose,
        createNewHabit,
        habitsData,
        setHabitsData,
        loadHabits,
        deleteHabit,
        formInitialValues,
        setFormInitialValues,
        updateHabit
    }
}

