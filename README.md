g-habilitate
==================
Tessel Hackathon Sept 2014

Create a proof of concept for a biofeedback tool that senses hand tremors or spasms and displays them on a ui to assist a patient in gaining cognitive control of them.  This tool could be used in medical settings to help people suffering from essential tremors or fine motor delays to train their small muscle movements.

Using data collected from the hand-held Tessel accelerometer module, data was stored a text object and streamed via websockets (nodejs-websocket and socket.io) to a simple HTML canvas application in the web browser.

Any movement picked up by the accelerometer (14 reads per minute) changes the x- and y-values, which in turn move a red ball in the canvas in relation to a stationary green zone. The goal for the user is to steady their motions in order to keep this moving ball within the green zone.

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

