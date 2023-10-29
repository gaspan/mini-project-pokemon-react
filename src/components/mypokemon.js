import React, { useEffect, useState } from 'react';
import { 
    Button, 
    Table, Image, 
    TransitionablePortal,
    Segment,
    Header,

 } from 'semantic-ui-react'
import axios from 'axios';



export default function MyPokemon() {


    const [pokemonList, setPokemonList] = useState([]);
    const [open, setopen] = useState(false);
    const [messageHeader, setMessageHeader] = useState('');
    const [messageBody, setMessageBody] = useState('');
    const [colorMessage, setColorMessage] = useState('');
    const [openRename, setopenRename] = useState(false);
    const [realname, setrealname] = useState('');
    const [nickname, setnickname] = useState('');



    const getData = () => {
        axios.get(`http://localhost:8080/pokemon/my`)
            .then((response) => {               
                setPokemonList(response.data.data)
            })
    }

    useEffect(() => {
        getData()
    }, [])



    const ReleasePokemon = (name) => {
        axios.post(`http://localhost:8080/pokemon/release`, {
            name,
        }).then((response) => {
            console.log('response:', response)

            if (response.status === 200 && response.data.is_prime_number) {
                setMessageHeader('Success')
                setMessageBody('Congratulation you Released a Pokemon. Number: ' + response.data.number + ' is prime number' )
                setColorMessage('blue')
                setopen(true)
                getData()
                setTimeout(() => {
                    setopen(false)
                }, 6000);
                
            } else {
                setMessageHeader('Failed')
                setMessageBody('Sory, you failed to Release. Number: ' + response.data.number + ' is not prime number')
                setColorMessage('red')
                setopen(true)

                setTimeout(() => {
                    setopen(false)
                }, 6000);
            }

        }).catch((e)=> {
            setMessageHeader('Failed')
            setMessageBody('Sory, you failed to Release. error backend')
            setColorMessage('red')
            setopen(true)

            setTimeout(() => {
                setopen(false)
            }, 6000);
        })
    }

    const openRenameBox = (name) => {
        setrealname(name)
        setopenRename(true)
    }

    const RenamePokemon = () => {
        axios.post(`http://localhost:8080/pokemon/rename`, {
            name: realname,
            given_name: nickname
        }).then((response) => {
            console.log('response:', response)

            if (response.status === 200 && response.data.message === "Success") {
                setopenRename(false)

                setMessageHeader('Success')
                setMessageBody('Congratulation you Rename a Pokemon.')
                setColorMessage('blue')
                setopen(true)
                getData()
                
                setTimeout(() => {
                    setopen(false)
                }, 6000);
                
            } else {
                setopenRename(false)

                setMessageHeader('Failed')
                setMessageBody('Sory, you failed to Rename')
                setColorMessage('red')
                setopen(true)

                setTimeout(() => {
                    setopen(false)
                }, 6000);
            }

        }).catch((e)=> {
            setopenRename(false)

            setMessageHeader('Failed')
            setMessageBody('Sory, you failed to Release. error backend')
            setColorMessage('red')
            setopen(true)

            setTimeout(() => {
                setopen(false)
            }, 6000);
        })
    }

    return (
        <div>

            <TransitionablePortal
                    open={openRename}
                >
                <Segment
                style={{ left: '35%', position: 'fixed', top: '35%', zIndex: 1000 }}
                >
                    <Header color={colorMessage}>Give NickName</Header>
                    <label>New name:</label>
                    <input placeholder='Nickname...' onChange={(e) => setnickname(e.target.value)}/>
                    <Button onClick={RenamePokemon} type='submit'>Submit</Button>
                </Segment>
            </TransitionablePortal>

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

            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Picture</Table.HeaderCell>
                        <Table.HeaderCell>Nick Name</Table.HeaderCell>
                        <Table.HeaderCell >Action </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {pokemonList.map((data) => {
                        return (
                        <Table.Row key={data.Name}>
                            <Table.Cell>{data.Name}</Table.Cell>
                            <Table.Cell>
                                <Image src={data.ImgFrontDefault} size='small' />
                            </Table.Cell>
                            <Table.Cell>
                                {data.NickName}
                            </Table.Cell>
                            <Table.Cell> 
                                <Button
                                    onClick={() => ReleasePokemon(data.Name)}
                                    >Release</Button>

                                <Button
                                    color='blue'
                                    onClick={() => openRenameBox(data.Name)}
                                    >Rename</Button>

                            </Table.Cell>
                            
                        </Table.Row>
                    )})}
                </Table.Body>
            </Table>

        </div>
    )
}