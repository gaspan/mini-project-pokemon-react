import React, { useEffect, useState } from 'react';
import {  Grid, Image,
    Button,
    TransitionablePortal,
    Segment,
    Header,
} from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Update() {
    // console.log('detail')
    const [name
        // , setName
    ] = useState(localStorage.getItem('name'));
    const [infoPokemon, setInfoPokemon] = useState({});
    const [open, setopen] = useState(false);
    const [messageHeader, setMessageHeader] = useState('');
    const [messageBody, setMessageBody] = useState('');
    const [colorMessage, setColorMessage] = useState('');

   
    useEffect(() => {
        
        axios.get(`http://localhost:8080/pokemon/detail/${name}`)
            .then((resp) => {
                setInfoPokemon(resp.data.data)
            })
        
    }, [name]);

    const catchPokemon = () => {
        axios.post(`http://localhost:8080/pokemon/catch`, {
            name,
            img_front_default: infoPokemon.sprites.front_default,
        }).then((resp) => {
            // navigate('/read')

            if (resp.status === 200 && resp.data.is_catched === 1) {
                setMessageHeader('Success')
                setMessageBody('Congratulation you catched a Pokemon')
                setColorMessage('blue')
                setopen(true)

                setTimeout(() => {
                    setopen(false)
                }, 6000);
            } else {
                setMessageHeader('Failed')
                setMessageBody('Sory, maybe you have to try later')
                setColorMessage('red')
                setopen(true)

                setTimeout(() => {
                    setopen(false)
                }, 6000);
            }
            
        }).catch((e) => {
            setMessageHeader('Failed')
            setMessageBody('Sory, maybe you have to try later')
            setColorMessage('red')
            setopen(true)

            setTimeout(() => {
                setopen(false)
            }, 6000);
        })
    }

    const render = () => {
        if (infoPokemon.name != null) {
            return <div>

                <TransitionablePortal
                        open={open}
                    >
                    <Segment
                    style={{ left: '35%', position: 'fixed', top: '35%', zIndex: 1000 }}
                    >
                    <Header color={colorMessage}>{messageHeader}</Header>
                    <p>{messageBody}</p>
                    </Segment>
                </TransitionablePortal>
                <Grid>
                    <Grid.Column width={4}>
                        <Image src={infoPokemon.sprites.front_default} size='medium' bordered />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <label>Moves: </label>

                        {infoPokemon.moves.map((data) => {
                            return (
                                <label>{data.move.name} || </label>
                            )
                            
                        })}
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Image src={infoPokemon.sprites.back_default} size='small' />
                    </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Column width={4}>
                        <h4>Name: {infoPokemon.name} </h4>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <label>Types: </label>

                        {infoPokemon.types.map((data) => {
                            return (
                                <label>{data.type.name} || </label>
                            )
                            
                        })}
                    </Grid.Column>

                    <Grid.Column width={2}>
                        <Button color='red' onClick={catchPokemon} >Catch Pokemon</Button>
                    </Grid.Column>

                    <Grid.Column className='mb-10' width={3}>
                        <Link to='/'>
                            <Button>Back</Button>
                        </Link>
                    </Grid.Column>

                </Grid>
            </div>
        }
    }

    return render()
}