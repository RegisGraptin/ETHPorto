// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract EventContract {

    event NewEvent(Event created_event);

    uint public event_id = 0;

    struct Event {
        string name;
        string starting_date;
        string ending_date;
        string location;
        address creator;
    }

    mapping(uint => Event) eventsMapping;

    function createEvent(string calldata name, string calldata starting_date, 
        string calldata ending_date, string calldata location) public returns (uint) {

        // Increase the unique id 
        event_id += 1;

        // Get the creator address 
        address creator = msg.sender;

        // TODO :: Price for the creation 
        // TODO :: Staking system (future version)

        // Create an event
        Event memory currentEvent = Event(name, starting_date, ending_date, location, creator);

        // Store the event
        eventsMapping[event_id] = currentEvent;

        // Emit a notification
        emit NewEvent(currentEvent);

        return event_id;
    }

    // Get the event lists 

}