import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { TextField, Button, Icon, Tag, ButtonDropdown, TextArea} from '@taikai/rocket-kit'

const inter = Inter({ subsets: ['latin'] })

export default function Event() {
    return(
        <>
            <head>
                <title>GreenRoom</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://api.fontshare.com/v2/css?f[]=bespoke-stencil@701,800,2,501,300,801,700,500,301,401,400,1&f[]=plus-jakarta-sans@501,601,500,600,700,701&f[]=general-sans@701,500,601,600,501,400,700&display=swap" rel="stylesheet"></link>
            </head>
            <nav id={styles.navbar}>
                <header class="header">
                    <ul>
                        <li>
                            <a class="nav-link" href="/">Homepage</a>
                        </li>
                        <li>
                            <a class="nav-link" href="/createevent">Create Event</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#FAQ">FAQ</a>
                        </li>
                        <li>
                            <a class="nav-link" href="#Support">Support</a>
                        </li>
                    </ul>
                </header>
            </nav>
            <main class={styles.main}>
                <div class={styles.center}>
                        
                <ButtonDropdown
                    actions={[
                    {
                    action: function noRefCheck(){},
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
                <TextField
                name="awesome-input"
                onChange={function noRefCheck(){}}
                placeholder="Awesome Placeholder"
                 type="text"
                />
                <TextField
                name="awesome-input"
                onChange={function noRefCheck(){}}
                placeholder="Awesome Placeholder"
                 type="text"
                />
                <TextField
                minimal
                name="awesome-date"
                onChange={function noRefCheck(){}}
                type="date"
                />
                <TextField
                minimal
                name="awesome-time"
                onChange={function noRefCheck(){}}
                type="time"
                />
                <TextField
                max={150}
                min={1}
                name="awesome-number"
                onChange={function noRefCheck(){}}
                placeholder="Your age"
                type="number"
                />
                <Tag
                color="purple500"
                txtColor="white"
                value="Burgdoggen"
                variant="solid"
                />
                <TextArea
                error=""
                height="100px"
                minimal
                name="awesome-text-area"
                onChange={function noRefCheck(){}}
                placeholder="Awesome Placeholder"
                />    

                </div>
            </main>
        </>
    )
}