import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { TextField, Button, Icon, Tag, ButtonDropdown, TextArea, GridContainer, GridCol, GridRow, SelectInteractive } from '@taikai/rocket-kit'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })
const Web3 = require("web3");


import EventContractABI from '../contract/EventContract.json';

export default function Event() {

    // Name
    // Location
    // Starting date
    // Ending date
    // Number of attendees
    // Tags
    // Description

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [startingDate, setstartingDate] = useState("");
    const [endingDate, setendingDate] = useState("");
    const [nbAttendees, setNbAttendees] = useState("");
    const [tags, setTags] = useState("");
    const [description, setDescription] = useState("");


    const createNewEvent = async () => {
        console.log('Create a new event');

        // Get the metamask account
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        // Get the user account
        let account = accounts[0];

        // Contract information
        let contract_address = "0x10AfB7bd9FF9836FAb357f9f7F48211f7211F116";


        let url = "http://127.0.0.1:7545";

        var web3 = new Web3(new Web3.providers.HttpProvider(url));
        const myContract = new web3.eth.Contract(
            EventContractABI,
            contract_address
        );


        // account = "0xF42E4b6d239A9098B7F21303F01CF1069fD5580E";

        console.log(account);

        let event_tx = await myContract.methods.createEvent(
            100,
            120,
            "name",
            "location",
        ).send({from: account, gas: '1000000'})


        // TODO :: Get the event id and check if it is good 
        // Check the result

        console.log(name);
        console.log(location);

        let list_events = await getEventList();
        console.log(list_events);
    }


    const getEventList = async () => {


        // Contract information
        let contract_address = "0x10AfB7bd9FF9836FAb357f9f7F48211f7211F116";

        let url = "http://127.0.0.1:7545";

        var web3 = new Web3(new Web3.providers.HttpProvider(url));
        const myContract = new web3.eth.Contract(
            EventContractABI,
            contract_address
        );


        let list_events : any[] = [];

        // If I only want the event id available
        return await myContract.methods.event_id().call().then(
            (res: any) => {
                
                for (let i = 1; i < res; i++) {
                    myContract.methods.getEvent(i).call().then(
                        (store_event: any) => {
                            list_events.push(store_event)
                        }
                    )
                }
                
                return list_events;
            }
        )
        
        
    }



    return (
        <>
            <Head>
                <title>GreenRoom</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://api.fontshare.com/v2/css?f[]=bespoke-stencil@701,800,2,501,300,801,700,500,301,401,400,1&f[]=plus-jakarta-sans@501,601,500,600,700,701&f[]=general-sans@701,500,601,600,501,400,700&display=swap" rel="stylesheet"></link>
            </Head>
            <nav id={styles.navbar}>
                <header className="header">
                    <ul>
                        <li>
                            <a className="nav-link" href="/">Homepage</a>
                        </li>
                        <li>
                            <a className="nav-link" href="/createevent">Create Event</a>
                        </li>
                        <li>
                            <a className="nav-link" href="#FAQ">FAQ</a>
                        </li>
                        <li>
                            <a className="nav-link" href="#Support">Support</a>
                        </li>
                    </ul>
                </header>
            </nav>
            <main className={styles.main}>
                <h1>Create a new event</h1>
                <div className={styles.center}>


                    {/* Event form */}
                    <GridContainer>
                        <GridRow>
                            <GridCol>
                                <TextField
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name of the event"
                                    type="text" />
                            </GridCol>

                            <GridCol>
                                <TextField
                                    name="location"
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Localization"
                                    type="text" />
                            </GridCol>
                        </GridRow>

                        <GridRow>

                            <GridCol>
                                <TextField
                                    minimal
                                    onChange={(e) => setstartingDate(e.target.value)}
                                    name="starting-date"
                                    type="date" />
                            </GridCol>
                            <GridCol>
                                <TextField
                                    minimal
                                    onChange={(e) => setendingDate(e.target.value)}
                                    name="ending-time"
                                    type="date" />
                            </GridCol>
                        </GridRow>


                        <GridRow>
                            <GridCol>
                                <TextField
                                    onChange={(e) => setNbAttendees(e.target.value)}
                                    max={10000}
                                    min={1}
                                    name="attendees"
                                    placeholder="Number of attendees expected"
                                    type="number" />
                            </GridCol>
                            <GridCol>

                            
                            <SelectInteractive class={styles.SelectInteractive}
                            multi
                            onChange={function noRefCheck(){}}
                            options={[
                            {
                                label: 'Tech',
                                options: [
                            {
                                isDisabled: true,
                                label: 'Blockchain',
                                value: 'Blockchain'
                            },
                            {
                                label: 'Meetup',
                                value: 'Meetup'
                            },
                            {
                                label: 'Hackathon',
                                value: 'Hackathon'
                            }
                        ]
                    },
                    {
                        label: 'Entertainment',
                        options: [
                    {
                        label: 'Music Concert',
                        value: 'Music Concert'
                    },
                    {
                        label: 'Exhibition',
                        value: 'Exhibition'
                    }
                    {
                        label: 'Workshop',
                        value: 'Workshop'
                    }
                ]
            }
        ]}
            value={{
            label: 'Meetup',
            value: 'Meetup'
        }}
    />

                        </GridCol>
                        </GridRow>


                        <GridRow>
                            <TextArea
                                onChange={(e) => setDescription(e.target.value)}
                                error=""
                                height="100px"
                                minimal
                                name="description"
                                placeholder="Description" />

                        </GridRow>

                    </GridContainer>

                    <Button
                    ariaLabel="Dummie Button"
                    className="button"
                    color="purple500"
                    icon=""
                    iconPosition="right"
                    txtColor="white"
                    value="Submit"
                    variant="solid"
                    onclick="createNewEvent"
                    />
                </div>
            </main>

        </>
    )
}