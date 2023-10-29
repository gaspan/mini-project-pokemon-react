import React, { useEffect, useState } from 'react';
import { Button, Table, Image, Pagination } from 'semantic-ui-react'
import axios from 'axios';
import { 
    Link,
 } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';



export default function Read() {

    // let navigate = useNavigate();

    const [pokemonList, setPokemonList] = useState([]);
    const [activePage, setactivePage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/pokemon/list?page=${activePage}`)
            .then((response) => {               
                setPokemonList(response.data.data.results)
                setTotalItem(response.data.data.count)
            })
    }, [activePage])

    const handlePageChange = (e, { activePage }) => {
        setactivePage(activePage);
    };

    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItem / itemsPerPage);

    const setData = (name) => {
        localStorage.setItem('name', name);
    }


    // const getData = () => {
    //     axios.get(`https://653c7088d5d6790f5ec7fb70.mockapi.io/fakeData`)
    //         .then((getData) => {
    //             //  setAPIData(getData.data);
    //          })
    // }

    // const onDelete = (id) => {
    //     axios.delete(`https://653c7088d5d6790f5ec7fb70.mockapi.io/fakeData/${id}`)
    //     .then(() => {
    //         getData();
    //     })
    // }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>picture front</Table.HeaderCell>
                        <Table.HeaderCell>picture back</Table.HeaderCell>
                        <Table.HeaderCell >Action </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {pokemonList.map((data) => {
                        return (
                        <Table.Row key={data.Name}>
                            <Table.Cell>{data.Name}</Table.Cell>
                            <Table.Cell>
                                <Image src={data.detail.FrontDefault} size='small' />
                            </Table.Cell>
                            <Table.Cell>
                                <Image src={data.detail.BackDefault} size='small' /> 
                            </Table.Cell>
                            <Table.Cell> 
                                <Link to='/detail'>
                                    <Button
                                     onClick={() => setData(data.Name)}
                                     >Detail</Button>
                                </Link>

                            </Table.Cell>
                            
                        </Table.Row>
                    )})}
                </Table.Body>
            </Table>

            <Pagination
                activePage={activePage}
                onPageChange={handlePageChange}
                totalPages={totalPages}
                firstItem={null}
                lastItem={null}
                />

        </div>
    )
}