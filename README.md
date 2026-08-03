# Beginner's Luck - CS50 Final Project

#### Video Demo: [https://youtu.be/3w29s6R59gU](https://www.youtube.com/watch?v=3w29s6R59gU)

## Introduction
There was a book I read in January called, The Alchemist, which has this quote called: `"Every search begins with beginner's luck. And every search ends with the victor's being severely tested.` Now my question is: "When we want to achieve our goals we can be lucky, but how can someone ensure or atleast increase the chances of success after that?"

It's certainly for sure that no being can guarantee success, but what we can do is work in a more organized way. Goals are often big, dreamy and almost too silly, and there's no shame in that. How about we break down these goals into smaller more managable tasks rather than relying motivational waves that come and go?

And that's how I came up with the idea of "Beginner's Luck", a goal planning application that makes sure we don't rely on luck, and it organizes your thoughts into more practical and visual ways.

It consists of these 3 elements:
- Main Goals
- Milestones
- Chores
### Main Goals
These are your big, dreamy and silly ambitions. They can be as abstract as possible because it's better to believe there's no limits in hoping. For example, "Win a Nobel Prize." No one says it's impossible!
### Milestones
These are more realistic approaches in achieving those **Main Goals**, often something which can be achieved within a month. Just like a farmer planning his yield rather than thinking about being rich. For example, "Read one book on Quantum Mechanics." 
### Chores
It can be washing the dishes, or doing laundry, but in our case related to the **Milestone**. Something extremely managable and easy, and almost seeming unrelated to the Main Goal. For example, "Read one page of The Strange Theory of Light and Matter, by John Gribbin"

## Setup
Clone this repository onto your machine. Once you've done that, head to the main directory.
You should see a stucture like this:
```
/backend
/frontend
README.md
```

cd into the backend in your terminal. Install all the required dependencies using this command:
```
/backend
pip install -r requirements.txt
```
Now start the virtual env, and if it's not there create one using `python -m venv venv`
for Windows Powershell
`.\venv\Scripts\Activate.ps1`
for Mac OS
`source venv/bin/activate`

Now run `python manage.py runserver`

The backend server should now be active. Create a new terminal and now we'll start the frontend.
cd into frontend. Install all dependencies using:
```
/frontend
npm install
```
Now run:
`npm run dev`

Now your app should be running on your very own machine.

## Implementation
This project is more like a thought organizer. Using new technologies like React JS and Django REST Framework seemed an interesting choice, since I've coded in React a bit (really bad at it), and knew Django from CS50W. 
I divided the project into Frontend & Backend, as they'll communicate using an API.

### Frontend 
When you'll open the `/frontend/src` directory, you will see `App.jsx` which is the main component of our website. It uses the React Router DOM to navigate you between pages, and certain pages are restricted using the `<ProtectedRoute />` component. This ensures that you can only see them if you're logged in. 

The actual home of our app is located in `/pages/Home.jsx`, which includes:
- A library component to show today's date (I lose track of days)
- A Daily Record Graph which shows you your weekly performance. Based on how much sleep, breaks, and work you've done, alongside with your productivity score for today.
- A button to add today's record
- A table for your **Main Goals**, **Milestones** and **Chores**, with the ability to Create new rows.

The `pages/Goal.jsx` redirects you to the first goal fetched `/goal/[goal_id]`, there you can perform all sorts of delete update, or edit operations on all goal related items. This app uses cards that popup to ensure seamless user experience when doing these operations. 

There is a specific order to create these entities: `Goals --> Milestones --> Chores`
#### Security Vulnerability
I used JWT Authentication to log the user in, which however is security vulnerable in this project, since it stores your JSON Web Token for auth in your local storage. 
#### Design Choices
- I've reused many CSS styles throughout the project for reducing redundancy.
- To make sure I don't refresh my app every time i make changes, I use React states which automatically re-render based on interaction
- The process for JWT is to obtain an access & refresh token from the backend, I've made it more reusable by using Axios API, so that I don't have to include the token in every one of the fetch requests.

### Backend
The backend is built using Django REST Framework. Each model is linked using foreign keys: Goals own multiple Milestones, while Milestones own multiple Chores. Every object also belongs to the authenticated user, ensuring that users cannot access or modify another user's data. Permissions are enforced both through JWT authentication and object-level ownership checks.

`` views.py ``
This file consists of all class-based view, with abstract ways to quickly make CRUD routes.
`` serializers.py ``
I've used serializers to convert python models from the database, to JSON to be sent to the user.
`` models.py ``
This file consists of all our related objects: Main Goals, Milestones, Chores, and DailyRecords while the User model is automatically made by django

### Conclusion
The most challenging aspect was factoring out React components for reusability, I've found myself going against the DRY principle at instances, but I'm willing to learn more skills to reduce those redundancies. This project has surely taught me alot and has been very fruitful.
### Appreciation to CS50
I took CS50x in 2025, and now I've completed the final project after 
a huge gap, as I was giving my exams. But the point is: I would like to 
thank Professor David J. Malan, Brian Yu, Doug Lloyd, Yuliia, and every other CS50 staff for their
dedication to building this amazing, wonderful, and spectacular course. It's an important component of my life, and more than just a
course. The way of teaching is what makes CS worth learning, and I hope to take it physically someday too.

What started as "This is CS50", is now the end of a README with skills and memories in my head.
