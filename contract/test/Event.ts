const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Event", function() {

    async function deployTokenFixture() {
        
        const eventContract = await ethers.getContractFactory("EventContract");
        const [owner, addr1, addr2] = await ethers.getSigners();

        const event = await eventContract.deploy();    

        await event.deployed();

        // Fixtures can return anything you consider useful for your tests
        return { eventContract, event, owner, addr1, addr2 };
    }

    it("Should create a new event", async function() {
        const { eventContract, event } = await loadFixture(deployTokenFixture);

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


    it("Should get the list of events", async function() {
        const { eventContract, event } = await loadFixture(deployTokenFixture);
        
        let name = "ETH Porto";
        let starting_date = "16/03/2023";
        let ending_date = "18/03/2023";
        let location = "Porto";


        // Create a first event
        await event.createEvent(
            name,
            starting_date,
            ending_date,
            location
        );

        let eventInformation = await event.getEvent(1);

        expect(eventInformation['name']).to.equal(name);
        expect(eventInformation['starting_date']).to.equal(starting_date);
        expect(eventInformation['ending_date']).to.equal(ending_date);
        expect(eventInformation['location']).to.equal(location);
        
        let create_second_event_request = await event.createEvent(
            "ETHCC Paris", 
            "17/07/2023",
            "20/07/2023",
            "Paris"
        );

        let secondEventInformation = await event.getEvent(2);
        expect(secondEventInformation['name']).to.not.equal(name);

    });

    it("Should join an existing event", async function() {
        const { eventContract, event } = await loadFixture(deployTokenFixture);
        await event.createEvent(
            "ETH Porto", 
            "16/03/2023",
            "18/03/2023",
            "Porto"
        );
        
        let attendees = await event.getAttendees(1);

        expect(attendees.length).to.equal(0);

        await event.joinEvent(1);
        
        attendees = await event.getAttendees(1);
        expect(attendees.length).to.equal(1);

        // await event.joinEvent(1);
        // attendees = await event.getAttendees(1);
        // expect(attendees.length).to.equal(1);

    });

    


})

