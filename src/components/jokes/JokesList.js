import React, { useCallback, useEffect, useState } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Joke from "./Joke";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  jokeList: {
    display: "flex",
    width: "80%",
    height: "80%",
  },
  jokeListSidebar: {
    backgroundColor: "#9575cd",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    zIndex: 2,
    borderRadius: 7,
  },
  jokeListTitle: {
    fontSize: "3rem",
    color: "white",
    fontWeight: 700,
    margin: 60,
    letterSpacing: 0,
  },
  sidebarImage: {
    width: "50%",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
  },
  jokeListJokes: {
    height: "90%",
    width: "70%",
    alignSelf: "center",
    backgroundColor: "white",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    overflow: "auto",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
}));

const JokesList = () => {
  const classes = useStyles();

  const [jokes, setJokes] = useState(null);

  const getJokes = async () => {
    let newJoke = [];
    let id = 1;
    for (var i = 1; i < 7; i++) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      newJoke.push({ id: i, text: res.data.joke, votes: 0 });
    }
    setJokes(newJoke);
  };

  useEffect(() => {
    getJokes();
  }, []);

  const handlevote = useCallback(
    (id, offset) => {
      let filteredJokes = jokes.filter((joke) => joke.id !== id);
      let joke = jokes.find((joke) => joke.id === id);
      joke.votes += offset;
      filteredJokes.push(joke);
      filteredJokes.sort((a, b) => b.votes - a.votes);
      setJokes(filteredJokes);
    },
    [jokes, setJokes]
  );

  if (jokes) {
    return (
      <Box className={classes.jokeList}>
        <Box className={classes.jokeListSidebar}>
          <Typography className={classes.jokeListTitle}>
            My
            <br />
            Jokes
          </Typography>
          <img
            className={classes.sidebarImage}
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="smile"
          />
        </Box>
        <Box className={classes.jokeListJokes}>
          {jokes.map((joke) => {
            return (
              <Joke
                votes={joke.votes}
                text={joke.text}
                upvote={() => {
                  handlevote(joke.id, 1);
                }}
                downvote={() => {
                  handlevote(joke.id, -1);
                }}
                key={joke.id}
              />
            );
          })}
        </Box>
      </Box>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default JokesList;
