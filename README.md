# VisioComp

##Inspiration

Annually, 2.78 million workers die due to work-related accidents and diseases, with 374 million more facing non-fatal incidents. That's 7,500 daily deaths, surpassing those from road accidents, war, and HIV/AIDS combined. [(Source here)] (https://unglobalcompact.org/take-action/safety-andhealth)


When workplace injuries do happen, many of them go unreported and workers are not compensated due to workers fearing workplaces or issues with the administrative logistics of filling worker comp claims. 


## What it does

SafeSight's AI-based technology addresses workplace injury through a combination of real-time monitoring, timely incident detection, and automated generation of accurate injury reports, ethically protecting human safety and efficiency.

Our product vertically integrates and automates all parts of worker compensation, which can be summarized in 3 S’s. 


STOP: Forget waiting for someone to notice the danger. SafeSight reviews security footage in real-time to instantly flag potential risks and threats to workplace environments. If spotted, 
SafeSight instantly alerts relevant personnel, ensuring prompt preventative action is taken.

SIGHT: In the unfortunate circumstance that a workplace accident occurs, SafeSight is the first to know. Our computer vision solution not only detects the incident, but also ensures that workers involved get the necessary help and treatment from the right people, whether that be medical staff, security, or management, ASAP.

SETTLE: Post-event, SafeSight helps you process and understand what happened. Our systems generate a detailed report based on footage, capturing essential data that aids in both addressing current incidents and preventing future ones.


## How we built it

Front-end: React (JavaScript, HTML/CSS)

Back-end: Flask, Google Firebase, TensorFlow

We use React.js to create the front-end of SafeSight. When user’s upload video footage, it is stored in firebase. We created a backend API using flask that then processes the video footage. We trained ML models using TensorFlow.
