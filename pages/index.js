import React, { useEffect } from "react";
import Head from 'next/head'
import { Container, Grid, Typography } from '@mui/material'
import ContentMain from '../components/ContentMain/ContentMain'
import styles from '../styles/Home.module.css'
import { NewHabitProvider, useNewHabitContext } from "../contexts/new-habit";

function Home({ habits }) {
  const { setHabitsData } = useNewHabitContext();

  useEffect(() => {
    setHabitsData(habits);
  }, []);

  return (
    <div>
      <Head>
        <title>Habit Tracker</title>
        <meta name="description" content="Track your daily habits!!!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ContentMain />
            </Grid>
          </Grid>
        </Container>
      </main>

      <footer className={styles.footer}>
        <Typography variant='body2'>Habit Tracker</Typography>
      </footer>
    </div>
  )
}

const HabitHome = (props) => (<NewHabitProvider>
  <Home {...props} />
</NewHabitProvider>)

export default HabitHome


export async function getServerSideProps(context) {
  let habits = [];
  try {
    let res = await fetch(process.env.NEXT_PUBLIC_API_HOST + "habits", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    habits = response.data;
  } catch (error) {
    console.log(error)
  }
  return {
    props: { habits: habits },
  }
}

// https://www.youtube.com/watch?v=Day-eJ6-4fQ&ab_channel=LeoRoese
// https://nextjs.org/docs/basic-features/data-fetching
// https://mui.com/components/typography/
// https://mui.com/components/grid/