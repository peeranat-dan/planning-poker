import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getGame, joinGame } from '../../../repository/games';
import './JoinGame.css';

interface JoinGameProps {
  gameId?: string | '';
}
export const JoinGame: React.FC<JoinGameProps> = ({ gameId }) => {
  const history = useHistory();

  const [joinGameId, setJoinGameId] = useState(gameId);
  const [playerName, setPlayerName] = useState('');
  const [gameFound, setIsGameFound] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (gameId) {
        if (await getGame(gameId)) {
          setIsGameFound(true);
        }
      }
    }
    fetchData();
  }, [gameId]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (joinGameId) {
      const res = await joinGame(joinGameId, playerName);
      setIsGameFound(res);
      if (res) {
        console.log('nav');
        history.push(`/game/${joinGameId}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className='card'>
        <CardHeader title='Join a Game' />
        <CardContent>
          <TextField
            error={!gameFound}
            helperText={
              !gameFound &&
              'Game not found, check your game Id or create a new game'
            }
            className='textField'
            required
            id='filled-required'
            label='Game ID'
            placeholder='xyz...'
            defaultValue={gameId}
            variant='outlined'
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setJoinGameId(event.target.value)
            }
          />
          <TextField
            className='textField'
            required
            id='filled-required'
            label='Your Name'
            defaultValue={playerName}
            variant='outlined'
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPlayerName(event.target.value)
            }
          />
        </CardContent>
        <CardActions>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='button'
          >
            Join
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
