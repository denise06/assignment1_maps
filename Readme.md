# WheretoPark?

## PROJECT  1 :  INTERACTIVE FRONTEND PROGRAMMING

This Website is built to allow drivers to quickly find available carparks and find out the carpark rates for them. 
Popular places like hotels, singapore attractions and the buzzling orchard road are available as quick filter for users to view the carpark rates. 
It aims to aid drivers in planning their journey. 

## SCOPE
The website plans to have the following features.

_Basic_
- Display the map
- Clicking on the About tab on the navigation bar brings users to a short summary of the website
- Quick filters through the use of radio buttons to display icons which displays the carpark rates markets to Singapore Attractions, Hotels, and Orchard Road vicinity. 
- Clustered the carpark rates markers to provide a better user experience instead of being overwhelmed with huge bunch of markers
- Display the various carparks availability status for different vehicle types
- A collapsable navigation bar allows users to hide the filter options and have a whole view of the map
- Clear all overlay display with a click
- The footer section includes a mailing list to inform subscribers about new updates to the website.


_Intermediate (coming soon...)_
- Filter the carpark availability based on vehicle type
- Allow user to input the destination so that he can plan ahead for his journey
- Allow user to chose the desired carpark to go to & plot the route to the carpark chosen

_Advance (current version will not have any development for this level)_
- Allow user to store the favorite carpark as part of their database
- Get the current location of the user

## UI
The navigation bar is responsive for small, medium and large screens based on Bootstrap's breakpoints. The hamburger icon is visible on the top left hand corner for smaller screens. 

Design was kept to a simple black and white which stands out admist the blue and grey maps. The use of bolded and thick fonts in the navigation bar makes it stand out and and appealing to users. 

The main highlight of the map is to allow drivers to find out about the carpark rates of the destination that they have in mind. The click of "Carpark rates" button will display the clustered layers and users can zoom in and drill down to the area that they are planning to go, giving them all the options around the area. 

Overlays which acts as filters are helpful as they are generally the places people will plan ahead before driving there. 

## Demo

A live demo can be found here https://denise06.github.io/assignment1_maps/. 

![Overview of Project in different devices](https://github.com/denise06/assignment1_maps/blob/main/images/Demo.png)

## UX
My Considerations for the website:
User : 
- Drivers

Considerations :  
- Drivers heading to town or attractions will tend to plan their journey ahead of time, hence a website that not only provides the carpark rates but also the availability will be really beneficial 
- Most users will be using the mobile website to access the page.

## Technologies
1. HTML
2. CSS
3. Bootstrap
4. Javascript

## Features
This site orientate around the use of leaflet and use of bootstrap html features.

My Design of the site:
- Simple and quick 
- Predefined filter option with the use of radio buttons allow users to filter the carpark rates with a single click.
- Each selection will change the user display on the map immediately
- Clicking on the car park rate markers will show: 
    - Carpark Name
    - Region 
    - Weekday Rates
    - Saturday Rates
    - Sunday/PH rates
- Clicking on the carpark availability will display the following:
    - Type of vehicle lots (Car lots, Lorry lots, Trailer Lots, Motor Lots)
    - Number of lots available


_Limitations: 

_Errors in console is due to the limit set by oneMap.sg, does not affect the function of the site_

_Features Left to Implement_
_- Allow user to search the designated location and return the nearest carpark _
_- A route to the searched carpark from user's current location

## Testing
Manual Testing is done to ensure that the all functions are functional.


*No* | *Steps* | *Expected Results* | *Observations*
--- | --- | --- | ---
1 | `When page is loaded ` | `No markers or lines on the map` | **Pass** 
2 | `Click on 'Car Availability' button` | `Display the car availability layer, lines` | **Pass** 
3 | `Click on 'Carpark Rates` | `Display carpark rates cluster` | **Pass** 
4 | `Drilldown the cluster layer to display on marker, click on the individual marker` | `Display the Carpark Name, Region, Weekday Rates, Saturday Rates, Sunday/PH rates` | **Pass** 
5 | `Click on attractions radio button` | `Display binoculars  icons overlay` | **Pass** 
6 | `Click on hotel radio button` | `Remove binoculars overlay and display hotel icons overlay` | **Pass** 
7 | `Click on orchard radio button` | `Remove hotel overly and display shopping bag icons overlay` | **Pass** 
8 | `Click on clear overlay radio button` | `Remove overlays` | **Pass** 
9 | `Click on downward arrow button at the filter option` | `Filtered options will collapse` | **Pass** 


## Deployment

This site is hosted using GitHub pages, deployed directly from the master branch. 
The deployed site will update automatically upon new commits to the master branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named index.html.
To run locally, you may click on the following link (https://denise06.github.io/assignment1_maps/)   into your terminal. 
To cut ties with this GitHub repository, type.git remote rm origin.into the terminal.

## Credits

-Content_
Data were extracted from https://data.gov.sg
 
Designs, layout and functions are original

Media
- Dropdown were taken from https://pro.fontawesome.com/releases/v5.10.0/css/all.css, a font/icon image library
- Marker icons were taken from https://flaticon.com



Acknowledgements
1. Use of Font Awesome full icons
2. Use of open street map 

