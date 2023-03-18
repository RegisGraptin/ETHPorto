
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="./logo_color.png" alt="Logo" height="80">
  </a>

  <h3 align="center">Green Room</h3>

  <p align="center">
    Hackathon - ETHPorto  
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="#">Report Bug</a>
    ·
    <a href="#">Request Feature</a>
  </p>
</div>




<!-- ABOUT THE PROJECT -->
## About The Project


<!-- mobile -->
![Product Name Screen Shot]()

Green house 

- Manage events
- Vibe check your events
- Connect with friends

TODO :: present our project


## Technical Documentation

For this project, we decomposed it into multiple parts. First of all, we will have a smart contract managing the creation of new events, the joining system for the user.

This smart contract can be deployed in Ethereum, but it can also be deployed on Mantle for gas efficiency.

To avoid any bad behavior and scam for creating a new events, we imagine a stacking system for the event. This stacking system will first allow the limitation on the creaton of event. This will also can incite people to participate in the event as fund are lock to be sure that the event will be there. 
Other approaches have come to mind about the checking part. 

We also implement a ChainLink Automation system with a Time-base trigger. Indeed, when the event is finished, we want to unlock the stacking token of the owner. As we want to this process to be smooth as possible for the user, we do not want them additionnal interaction with the blockchain. Then, we think that a external trigger to unlock the token could be an interesting functionnality.

We also imagine a system of stacking for the organizer of an event. This stacking system will force the creator to create an event, 


