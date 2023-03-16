import { expect } from "chai";
import { ethers } from "hardhat";

describe("Event", function() {

    it("Create Event", async function() {

        const EventContract = await ethers.getContractFactory("EventContract");
        const event = await EventContract.deploy();    

        // Create a first event
        let create_first_event_request = event.createEvent(
            "ETH Porto", 
            "16/03/2023",
            "18/03/2023",
            "Porto"
        );

        let tx = await create_first_event_request;

        expect(tx).to.emit(event, "NewEvent")
        expect(await event.event_id()).to.equal(1);
        

        let create_second_event_request = event.createEvent(
            "ETHCC Paris", 
            "17/07/2023",
            "20/07/2023",
            "Paris"
        );
        
        tx = await create_second_event_request; 

        expect(tx).to.emit(event, "NewEvent")
        expect(await event.event_id()).to.equal(2);
        
        

    });

})

