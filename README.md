# Info screen 
This is the assigment of Eficode Summer job. 

### What I did
- The info screen displays the timetable of public transportation which will leave from the stops near the Eficode headquarter in a short time.
- Used HSL open data interface, use Graphql as the query language
- Published the solution in Heroku ([demo](https://eficodepreassignment.herokuapp.com/))
- Used Docker for packaging the application. The image is in [Docker Hub](https://hub.docker.com/repository/docker/yumol/eficodepreassignment). Run the container with `docker run -p3000:3000 yumol/eficodepreassignment`, the website can accessed on http://localhost:3000/. 
- Used React
- Used Robot Framework for user interface testing (test if the timetable shows stops near the Eficode headquarter)
- Used Semantic UI as UI framework
- Used eslint

