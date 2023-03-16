// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract EventContract {

    event NewEvent(Event created_event);
    event NewAttendee(uint evendid, address attendee);

    uint public event_id = 0;

    struct Event {
        string name;
        string starting_date;
        string ending_date;
        string location;
        address creator;
    }

    mapping(uint => Event) eventsMapping;
    mapping(uint => address[]) eventAttendeesMapping;
    mapping(address => uint[]) participatedEventMapping;

    function createEvent(
        string calldata name, 
        string calldata starting_date, 
        string calldata ending_date, 
        string calldata location) public returns (uint eventid) {

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

}