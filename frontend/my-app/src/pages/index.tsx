import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { TextField, Button, Tag, Icon} from '@taikai/rocket-kit'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const loginWithMetamask = async () => {
    console.log('loginWithMetamask');
    
    // Check if metamask is installed
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
  
      // Get the metamask account
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      // Get the user account
      const account = accounts[0];

      console.log(account);
    }
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
                <header class="header">
                    <ul>
                        <li>
                            <a class="nav-link" href="/">Homepage</a>
                        </li>
                        <li>
                            <a class="nav-link" href="createevent">Create Event</a>
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
                <h1>GreenRoom</h1>
                <div class={styles.description}>
                    <h3>For Event Organizers!</h3>
                </div>
                <div class={styles.main}>
                <button onClick={loginWithMetamask}>
                  Click Me
                </button>
                
                </div>
            </main>
            <footer class={styles.footer}>
                    <p>@GreenRoom, 2023 | ETHPorto</p>
            </footer>
        </>
    )
}
