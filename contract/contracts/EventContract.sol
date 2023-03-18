// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

contract EventContract is AutomationCompatibleInterface{

    event NewEvent(Event created_event);
    event NewAttendee(uint evendid, address attendee);

    uint public event_id = 0;

    struct Event {
        uint starting_date;
        uint ending_date;
        uint stacking; 
        address creator;
        string name;
        string metadata;   // Store an IPFS link to the metadata 
    }


    mapping(uint => Event) eventsMapping;
    mapping(uint => address[]) eventAttendeesMapping;
    mapping(address => uint[]) participatedEventMapping;

    function createEvent(
        uint starting_date, 
        uint ending_date, 
        string calldata name, 
        string calldata metadata) public payable returns (uint eventid) {

        // Increase the unique id 
        event_id += 1;

        // Get the creator address 
        address creator = msg.sender;

        // TODO :: Price for the creation 
        // TODO :: Staking system (future version)

        (bool success, ) = payable(address(this)).call{value: msg.value}("");
        require(success, "Failed to send Ether");

        // Create an event
        Event memory currentEvent = Event(starting_date, ending_date, msg.value, creator, name, metadata);

        // Store the event
        eventsMapping[event_id] = currentEvent;

        // Emit a notification
        emit NewEvent(currentEvent);

        return event_id;
    }

    function getEvent(uint eventid) public view returns (Event memory) {
        return eventsMapping[eventid];
    }

    function joinEvent(uint eventid) public {
        // Check that the event is valid
        require(eventid != 0);
        require(eventid <= event_id);
        
        // Check that the user is not have already joined the event
        // => Cost more fees to iterate over all the data

        // TODO :: Check condition (date, event registration open...)

        eventAttendeesMapping[eventid].push(msg.sender);
        participatedEventMapping[msg.sender].push(eventid);

        emit NewAttendee(eventid, msg.sender);
    }

    function getAttendees(uint eventid) public view returns(address[] memory) {
        // Get all the attendee from an event
        return eventAttendeesMapping[eventid];
    }

    // Get Events from user
    function getParticipatingEvent() public view returns (uint[] memory) {
        return participatedEventMapping[msg.sender];
    }

    function checkUpkeep(
        bytes calldata
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        // Check if one event is finished
        for (uint i = 1; i < event_id; i++) {
            upkeepNeeded = (block.timestamp - eventsMapping[i].ending_date) > 0;
            if (upkeepNeeded) {
                break;
            }
        }
    }

    function performUpkeep(bytes calldata) external override {
        
        bool upkeepNeeded = false;

        // Unstack the event money
        for (uint i = 1; i < event_id; i++) {
            upkeepNeeded = (block.timestamp - eventsMapping[i].ending_date) > 0;
            if (upkeepNeeded) {
                upkeepNeeded = false;
                
                // Get the finished event
                bool sent = payable(address(eventsMapping[i].creator)).send(eventsMapping[i].stacking);
                require(sent, "Failed to send Ether");

                // Update now the stacking value
                eventsMapping[i].stacking = 0;
            }
        }
    }

}