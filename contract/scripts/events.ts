
import {Erc721Standard} from '@taikai/dappkit';

require('dotenv').config({ path: __dirname + '/../.env' });

async function createEventTickets(userAddresses: string[]) {

    let privateKey = process.env.PRIVATE_KEY;

    let deployer = new Erc721Standard({
        web3Host: "http://127.0.0.1:7545",
        privateKey: privateKey
    });

    await deployer.connection.start();
    await deployer.loadAbi();
  
    // Create the Event tickets
    let eventTicket = await deployer.deployJsonAbi("ETH Porto", '#ticket');
    const myNFT = new Erc721Standard(deployer.connection, eventTicket.contractAddress);
    await myNFT.loadContract();

    // Mint for each participant address a NFT 
    for (var i in userAddresses) {
        let receipt = await myNFT.mint(userAddresses[i], +i, '0x0');
        console.log('Minted!');
    }
    
}

createEventTickets([
    "0x39E9617bE6003897a04B6Eb1512e3b40A53E785A",
    "0x58c05d14eABF9Ee54B035468D8Cde5EC30618E81",
    "0x3B0f750a7972e688e35a1f73e832354f7C5C8d86",
    "0x94847b1e58Ab1B50F330f92A2e468ae4EF02Ad35",
    "0xE5004E2F78e934C3FD64e847C0903DB41345FA18",
])