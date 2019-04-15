<h6 align="center">
  <br>
    <a href="https://guinane.xyz/Eye-Tracking-OS/"><img width="300" src="https://raw.githubusercontent.com/qjack001/Eye-Tracking-OS/master/assets/logo.png" alt="Eye-OS logo"/></a>
  <br>
</h6>

<h4 align="center">Eye-OS is a gaze-based operating system, built as the cumulative project for CISC-325 (Human-Computer Interaction).</h4>

<p align="center">
  <a href="#description">Description</a> •
  <a href="#implementation">Implementation</a> •
  <a href="#evaluation">Evaluation</a> •
  <a href="#future-development">Future Development</a> •
  <a href="#authors">Authors</a> •
  <a href="https://github.com/qjack001/Eye-Tracking-OS/blob/master/assets/d530Poster.pdf">Poster</a>
</p>

![screenshot](https://raw.githubusercontent.com/qjack001/Eye-Tracking-OS/master/assets/screenshot.png)

## Description

Eye-OS is a mock operating system that leverages eye-gazing as a primary interaction method. This proof of concept focuses on video playing as a high-level goal, and explores ways in which video playing’s sub-tasks can be optimized for this new interaction. The three main aspects to the mock-up are a file manager, a video player, and a calibrator. These components enhance the experience of using eye-gazing and, although built within the context of a video player, can be applied to more general eye-gaze-input systems as well.

The core goal of this project is to create a system designed for eye-gazing. Like other uncommon interaction-models (speech input, VR, etc.), eye-tracking has a lot of downsides that have limited its use in the real world. To remedy these problems, we first identified what the main ones were: **inaccuracy of tracking**, **perception & interaction interference**, and **stress of using a new form of interaction**. 

In order to solve these problems, we employed many of the concepts learned in class. The first problem, inaccuracy, was aided with the use of Fitts’ law. As discussed in the Literature Review, Fitts’ law has been adapted to gaze-based applications; however, due to the limitations of Webgazer.js, the probability of hitting the target was greatly diminished. According to Fitts’ law, by increasing the width of the target in the direction of motion, the time it will take the user to hit the target decreases. In most cases, this was achieved by simply increasing the size of the target (making the film files bigger). However, for the navigation between pages, we placed the targets on the border of the screen. A target on an edge has infinite width, allowing us to gain the smallest MT (average time to complete the movement). By applying the concepts behind Fitts’ law, we were able to improve the speed at which users could select elements of the interface, without actually improving the accuracy of the eye-tracking.


### Perception vs. Interaction

Perception is defined as becoming aware of something through the senses. For screen-based interfaces, that sense is sight. This becomes a problem, however, when the main form of interaction is also sight. To successfully navigate the application, users must first perceive the UI, yet there is no way to do this in our system without interacting with it unintentionally. We approached this problem by limiting the effect of the user’s interaction. This way, perceiving an element never altered the state of the system in a significant way (i.e. opening a video, changing the page, etc.). 

Additionally, we employed a multitude of Human-Computer Interaction concepts to reduce the amount of time required to perceive the system. In doing so, users are able to quickly understand what they’re looking at so they can begin to interact with it.

1. We limited the number of films on each page to 5. With the addition of the 4 border-buttons, the total number of interactable elements at any time was never more than 9. This value sits within George Miller’s magic number (7 + or - 2). Miller’s number suggests a maximum capacity for short-term memory, so by limiting the interface to only 9 elements users are able to remember what is on the screen and not have to re-scan the page.

2. Information that is no immediately necessary is hidden. Titles, descriptions, ratings, and other data on the film is only revealed when looking directly at that film. Hiding these elements increased the amount of whitespace, giving users the opportunity to rest their eyes. Additionally, the revealing of this information works as a form of task conformance, indicating that the system understands which element the user is focusing on.

3. When this information is revealed, principals of good typography are used to make reading the text easier. A sans-serif font is used for the body text (a best practice), and a serifed font is used for titles to distinguish the two elements. The titles are also much larger and bolder (both exceed Weber’s constant) to make them immediately distinguishable.

4. Users are able to properly assume that all film files operate in the same way, because they are styled similarly. The Law of Similarity states that similar items are perceived to belong together. This is also achieved through a second Gestalt principle, the Law of Common Fate. When changing pages, the films animate in by moving into the frame together. Items that move together are perceived to belong together, according to the Law of Common Fate, helping users quickly understand that the elements are all films.

5. There are no titles indicating which page the user is on, removing an element to read. Instead, the current page is communicated through colour and spatial mapping. Each border-button takes the user to a page in that direction. This cardinal navigation system allows users to spatially map the system, better understanding where they are. Spatial mapping is an essential element of a good design model.

6. When the page is changed, the background shifts to a colour associated with that page. Users are thus able to quickly remember what page they are on given the colour of the background. We chose colour, since it is one of the design variables that is distinctive (allowing users to perceive a change) but not ordinal (since we did not want to suggest an order to the pages).

The combination of all of these concepts allows Eye-OS to require the least amount of perception to understand the current state. This, when combined with the limited effect of interaction, reduces the amount of interference between perception and interaction. 

![animated demo](https://raw.githubusercontent.com/qjack001/Eye-Tracking-OS/master/assets/demo.gif)

## Implementation

Our project was built using standard HTML, CSS, and Javascript. The only library we used was Webgazer.js, which gave us the basic tools to track the user’s eye. The choice to build our project on the web was made for two reasons:


1. **Accessibility.** Almost all computers are capable of running websites, and doing so requires no pre-installed libraries, compilation, or understanding of Computer Science to run. This means that Eye-OS is accessible to the most amount of people possible. Those who do not have a technical background are still able to easily interact with our system, from anywhere in the world. Furthermore, our minimal use of libraries keeps load times low and removes dependencies on external codebases.
2. **Speed.** Web development is fast and streamlined. By building the project in HTML, CSS, and Javascript, we were able to quickly create a hi-fi evolutionary prototype, and rapidly iterate on our design. This meant that users were able to test our system and provide feedback early on Since our prototype was not a throwaway prototype, we didn’t waste time on something that wasn’t going to be used (given the short time constraints on the project).

Our final product uses Webgazer.js for eye-tracking, with some modifications to improve accuracy, and is hosted on our own Node.js server. To run Webgazer.js, a server with HTTPS enabled is required. A Linux VPS running Ubuntu with free HTTPS through Certbot was set up to achieve this and to allow for relatively easy changes to the site to be made. The site is dynamically served through an NGINX reverse proxy and a simple Node.js server. This is all hosted at https://beanjuice.ca, as this domain name was already owned.


### Object Selection Improvements

Designing an object selection system for a low-accuracy input is a challenging task. The first goal was to improve the accuracy of our prediction of the user’s gaze. Webgazer’s initial prediction didn’t work very well as a cursor. The predicted positions jumped suddenly and resulted in a lot of miss-clicking. We implemented a system in which Webgazer’s previous predictions were stored and averaged to find a more accurate estimation of the user’s current gaze. Averaging previous gaze positions results in a loss in response time for obvious reasons but was made up for with improved accuracy. We found that the best compromise between these two factors was when the previous 7 locations were used to determine the average.

The next change we made was using a selection area rather than a just a singe coordinate. We changed the cursor to be a center-transparent ellipsoid that could select any object that fell within it. This significantly improved the ease with which users could select objects. It meant that we had to implement a way between deciding between multiple selectable elements that were within the area, which we did by prioritizing the one closest to its center. We already avoided having objects close together, so that wasn’t a core problem we had to worry about.
 
The final change we made to the cursor was to make its size dynamic. We linked its X and Y radius to the standard deviation of our previous locations. Larger SD meant that we were less sure of our gaze prediction, and so the area increased. When the user fixated on something, the circle got smaller to allow for more accurate selections. This change gave the user a lot more visual feedback on how our system was working and felt more natural to them. Users enjoyed the new cursor and found it to be a much-needed improvement over our initial method. The transparent center didn’t directly get in the way of what the user was looking at, and we saw a significant reduction in rapid cursor movements.

### (Ideal) Physical Installation

Eye-OS can be interacted with from anywhere. Often this results in users using low-quality webcams in low-light conditions. For the demonstration of our system, we created an ideal setup to maximize the accuracy of the eye-tracking. The implementation of this setup involved a Logitech Brio 4K webcam to increase the quality of image, a projector to enlarge the screen, and a bright light to improve the lighting conditions. The larger screen increased the perceived accuracy of the system by exaggerating the amount of eye movement required to look around the UI.

## Evaluation

After completion of the initial prototype, we tested our system with users unfamiliar with eye-gazing interaction models. Overall, it seems that our designer’s mental model and the users’ mental models were relatively similar. This was probably due to the amount of time we spent, before we began development, informally asking others what they would want from our project and testing the system with a hi-fi prototype throughout development. Our general tasks were more or less aligned with what users thought (gaze at an image for a description, look to the bottom to exit videos, look to the left and right to navigate between pages, etc.). Of course, there were some misunderstandings and differences. Due to the lack of accuracy with the eye tracking, users ran into many skill-based slips, and it was sometimes difficult to recover from an incorrect click on a film since you had to access the bottom edge of the screen via eye-tracking.

## Future Development

With more resources, it would obviously be important to develop more applications for the operating system. We feel that eye-gazing is powerful for data management, so it would be interesting to see in what way eye-tracking might change something like email or word processing. It would also be useful to try and further develop the ways in which the users are taught how the interactions work. When we conducted user studies, we found that we had to provide quite a bit of explanation upfront just so that users understood the new environment. Given more time, it might be beneficial to develop some animated tutorial that could guide newcomers around our new eye-tracking paradigm. 

## Authors

**[Jack Guinane](https://github.com/qjack001)** — Front-end design and development

**[Quinn Pollock](https://github.com/HoloPollock)** — Back-end development (focus on setting up framework)

**[Alexandre Pana](https://github.com/alexandrepana)** – Back-end development (focus on improved eye-tracking)      

**[Maxwell Keleher](https://github.com/maxkele)** — Front-end contribution, user testing

**[David Vassos](https://github.com/davidvassos)** — Media creation
