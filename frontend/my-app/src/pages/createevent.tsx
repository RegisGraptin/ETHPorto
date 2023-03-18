import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { TextField, Button, Icon, Tag, ButtonDropdown, TextArea, GridContainer, GridCol, GridRow} from '@taikai/rocket-kit'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

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
        const account = accounts[0];

        // Get the fields information

        console.log("Selected name: ");
        console.log(name);

        
        // Sign a transaction 

        // Check the result

        console.log(name);
        console.log(location);
    }
  



    return(
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
                                type="text"/>
                        </GridCol>

                        <GridCol>
                            <TextField
                                name="location"
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Localisation"
                                type="text"/>
                        </GridCol>
                    </GridRow>
                    
                    <GridRow>
                    
                        <GridCol>
                            <TextField
                                minimal
                                onChange={(e) => setstartingDate(e.target.value)}
                                name="starting-date"
                                type="date"/>
                        </GridCol>
                        <GridCol>
                            <TextField
                                minimal
                                onChange={(e) => setendingDate(e.target.value)}
                                name="ending-time"
                                type="date"/>
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
                            
                            <Tag
                                // onChange={(e) => setTags(e.target.value)}
                                color="purple500"
                                txtColor="white"
                                value="Burgdoggen"
                                variant="solid"/>

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



                <ButtonDropdown
                    actions={[
                        {
                            action: createNewEvent,
                            id: 'createChallenge',
                            url: null,
                            value: 'Hackathon'
                        },
                        {
                            action: function noRefCheck(){},
                            id: 'createHiringChallenge',
                            url: null,
                            value: 'Hiring Challenge'
                        }
                    ]}
                    ariaLabel="Create new challenge"
                    className="button-dropdown"
                    color="purple500"
                    icon="add"
                    txtColor="white"
                    value="Create"
                    variant="solid"
                />

   

                </div>
            </main>
            
        </>
    )
}