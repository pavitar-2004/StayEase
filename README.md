# StayEase
StayEase is a responsive, single-page hotel booking website that allows users to explore different rooms, view amenities, and book their stay. This project is built using HTML, CSS, and JavaScript, and it features a dynamic backend for authentication and booking management.
Key Features
Responsive Design: The website layout adapts to various screen sizes, ensuring a seamless experience on both desktop and mobile devices.

Interactive UI: Smooth animations are implemented using the ScrollReveal library to enhance user engagement.

User Authentication: A robust login system is in place, powered by Firebase Authentication. This allows users to log in securely. For local use, a simple in-memory demo login is available.

Booking Management: The booking form is connected to a live Firestore database. Submissions are saved, providing a real-world backend experience. When running locally, a console message will confirm the booking.

Image Placeholders: The project includes fallback placeholders for images and videos, ensuring the layout remains intact even if the original assets are not available.

Getting Started
Since the entire website is contained within a single index.html file, getting started is very straightforward.

Download the file: Download the index.html file to your computer.

Open in a browser: Simply open the file in your preferred web browser. All HTML, CSS, and JavaScript are self-contained.

Note: For the best experience, you may want to create an assets folder in the same directory as the index.html file and place the images and video there. Placeholders are already included in the code if you don't have the original assets.

Local Login Credentials:
When running the project locally, you can use the following credentials to test the login functionality:

Email: admin@example.com

Password: password123

Backend Technology
This project utilizes Firebase as a backend-as-a-service platform. It includes:

Firebase Authentication: Used to manage user sessions and authentication state.

Firestore Database: A NoSQL cloud database used to save and retrieve booking information.

These backend services are automatically configured when the project is run in the online Canvas environment. When you run the file locally, a separate logic branch is used to simulate this functionality without needing a live connection to a database.
