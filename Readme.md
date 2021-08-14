# Carparkwhere?

## PROJECT  1 :  INTERACTIVE FRONTEND PROGRAMMING

This Website is built to allow drivers to quickly find available carparks and find out the carpark rates for them. 
Popular places like hotels, singapore attractions and the buzzling orchard road are available as quick filter for users to view the carpark rates. 
It aims to aid drivers in planning their journey. 

## SCOPE
The website plans to have the following features.

_Basic_
- display the map
- limit carpark rates markets to Singapore Attractions, Hotels, Orchard Road vicinity
- display the various carparks availability status for different vehicle types
- display carpark rates as overlay over the carpark availability

_Intermediate (comming soon...)
- filter the carpark availability based on vehicle type
- allow user to input the destination so that he can plan ahead for his journey
- allow user to chose the desired carpark to go to & plot the route to the carpark chosen

_Advance (current version will not have any development for this level)_
- allow user to store the favorite carpark as part of their database
- get the current location of the user

## Demo

A live demo can be found here. https://anacodae.github.io/Assignment2-HDBCarparkNearby/ 

![Overview of Project in different devices](https://raw.githubusercontent.com/AnaCodaE/Assignment2-HDBCarparkNearby/master/images/project.png)

## UX
My Considerations for the website:
User : 
- Drivers

Considerations :  
- Have no opportunity to surf net as their hands are on the wheels more often than not Require a simple interface to locate the carpark information
- Some drivers may like to prepare ahead of their journey
- I identify that most drivers will be utilizing their mobile devices to assess this webpage

## Technologies
1. HTML
2. CSS
3. Bootstrap
4. Javascript
5. Leaflet

## Features
This site orientate around Google Map and uses JQuery to complete the interface

My Design of the site:
- Simple & Quick Access to information and location on the carpark availability.
- Pre-fixed options using Radio buttons allow user to enter the selection with ease.
- Every selection will return a immediate response on the display, hence allows user to get their desired information faster
- Website is design using mobile-first approach
- 2 step procedure. User only need to choose or enter his location and select the range of nearby carparks.
- Info Window opens up upon clicking on the carpark marker; providing them the following key information;
    - Address of location
    - Number of lots available for the carpark
    - Type of carpark (Open/Basement/Multi-Storey)
- Location search function is added for users who wants to plan their journey.

_Limitations: Page will take while to load the data from the website as the website uses 3 callback functions to combine 2 data sets and also a website to convert the 3414(SVY21) to 4326(WGS84)_

_Errors in console is due to the limit set by oneMap.sg, does not affect the function of the site_

_Features Left to Implement_
_- Route to the selected carpark from current location (Not implemented due to cost consideration)_

## Testing
Manual Testing is done to ensure that the all functions are functional.


*No* | *Steps* | *Expected Results* | *Observations*
--- | --- | --- | ---
1 | `Page show load with current location and upon clicking on 'Current Location' radio button` | `Display the current location of user` | **Pass** 
2 | `Click on 'Find Location' radio button` | `Display an input box for user to key in the location` | **Pass** 
3 | `Click on the different radius to view nearby carparks` | `Display markers for surrounding markers within selected radius` | **Pass** 
4 | `Enter location in the input box and select from dropdown` | `Display will center to the selected destination` | **Pass** 
5 | `Click on the carparks marker` | `Show an infoWindow showing; carpark address, carpark type, lots available, any free parking and distance from current location` | **Pass** 

## Deployment

This site is hosted using GitHub pages, deployed directly from the master branch. 
The deployed site will update automatically upon new commits to the master branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named index.html.
To run locally, you may click on the following link (https://anacodae.github.io/Assignment2-HDBCarparkNearby/)   into your terminal. 
To cut ties with this GitHub repository, type.git remote rm origin.into the terminal.

## Credits

-Content_
Data were extracted from https://data.gov.sg for the location of carpark and live data of the carpark availability.
 
Design of the layout and functions are original by myself

Media
Markers Icons were taken from https://icons8.com/icons/set/map-marker, a icon image library

Acknowledgements
1. The website used a conversion function from https://docs.onemap.sg/ to convert the 3414(SVY21) to 4326(WGS84)
2. Reference to Google Map Dev Examples for constructing and combining the various functions;
    - GeoLocation
    - AutoComplete
    - Marker Placement
    - InfoWindow
 
