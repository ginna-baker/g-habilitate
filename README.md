g-habilitate
==================
Tessel Hackathon Sept 2014

Create a proof of concept for a biofeedback tool that senses hand tremors or spasms and displays them on a ui to assist a patient in gaining cognitive control of them.  This tool could be used in medical settings to help people suffering from essential tremors or fine motor delays to train their small muscle movements.

Using data collected from the hand-held Tessel accelerometer module, data was stored a text object and streamed via websockets (nodejs-websocket and socket.io) to a simple HTML canvas application in the web browser.

Any movement picked up by the accelerometer (14 reads per second) changes the x- and y-values, which in turn move a red ball in the canvas in relation to a stationary green zone. The goal for the user is to steady their motions in order to keep this moving ball within the white zone.

Technology used:
Hardware:
1 Tessel
1 Accelerometer module
1 Laptop computer
1 wifi router

Software:
Coded in NodeJS, JavaScript, jQuery, HTML
Express server
Connection through IP address using wifi
NPM Tessel
NPM accel-mma84

Steps to optimization for medical testing:

- Improve UI/UX, allowing non-programmers to benefit
- Store files on tessel to increase portability -- may even be optimized to mobile app with web database to allow providers to track user progress/regress in real time
- Use gamification principles to increase enjoyment for users of all ages and promote increased use

Instructions for Developer Use:

1. Clone this repo

2. Enter your computer's IP address into line 6 of tessel/tesselGHabilitate.js, replacing the IP address currently listed there.

3. Connect your tessel (with accelerometer) to your computer via USB.

3. In bash, go to /tessel and type 'tessel push tesselGHabilitate.js'.

4. Press the reset button on your tessel. Ensure that your tessel connects to the computer by watching for a solid orange light (wifi connect) and a bash message ("connected").

5. In bash, go to /biofeedback and type 'npm start'.  Point your browser to localhost:3000. You should see x and y values begin to print in the bash console.  (If not, try hitting reset on the tessel again.)

Example bash output:

Server recieved from Tessel: { "x" : "0.12", "y": "-0.07" }
Server recieved from Tessel: { "x" : "0.12", "y": "-0.07" }
Server recieved from Tessel: { "x" : "0.12", "y": "-0.07" }
Server recieved from Tessel: { "x" : "0.12", "y": "-0.07" }
Server recieved from Tessel: { "x" : "0.12", "y": "-0.07" }
Server recieved from Tessel: { "x" : "0.12", "y": "-0.07" }
Server recieved from Tessel: { "x" : "0.12", "y": "-0.07" }
