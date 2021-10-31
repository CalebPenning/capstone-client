# Cinema Social Client

## Welcome to Cinema!

This is the Client app for Cinema, a social media application that allows users to write reviews for their favorite media, as well as keep up with what other users are watching!
App is hosted here: http://cinema-social.surge.sh/

To get it running on your machine, you'll need to do a few things:
- Have psql installed on your machine. 
- Download the API here: https://github.com/CalebPenning/capstone-movie-app/tree/main/server
- run npm install
- run command line command "createdb <DB_NAME>"
- Add a file called 'secrets.js' with a variable apiKey = <validOmdbApiKey> (they're free!) and baseUrl = "http://www.omdbapi.com/?apikey=<apiKey>&"
- Run db-schema.sql, then db-seed.sql to get some dummy data in there.
Now, you should be able to run node / nodemon server.js
  
If you run the Client app without a server running, it won't display information, and the routes won't work.
 
If the Server is running, all you have to do to get the client up is npm install + npm start. 
  
### Features:
  
  
### User Flows:
  - Brand New User:
  > User lands on homepage. On a phone, they click the nav toggle button, and then click Register.
  > From here, all the user has to do is enter valid data and click sign up. Username must be unique, and cannot exceed 30 characters.
  > Password must be 20 or less characters.
  > first and last names can't be longer than 30 characters.
  > email must follow email convention, cannot be longer than 60 characters. 
  > bio is optional. if left blank, your bio will be an empty string.
  
  - Returning User:
  > From homepage, navigate to /login
  > Enter valid username/password combo, get logged in and redirected home
  > From here, users can search for media to review and navigate that way. If they are following users, those users latest posts will show up on the homepage. They can also navigate this way. They can also go to "My Profile" on the user navbar, and look at things they've posted and liked to navigate else where.
  
  - Getting User details:
  > Anywhere there are reviews posted, you can click on the poster's username to see their profile. 
  > Their reviews will be displayed here, as well as their user info. You can also see who they're following, who follows them, and reviews they have liked. You can also follow a user here.
  
  - Searching for movies/media:
  > The logged in user navbar has a link to "search". When you click, you will be brought to a search form.
  > enter a search term (longer than 3 non-whitespace characters) and a list of results will display.
  > From here, click the movie title to be brought to the media details page.
  
  - Visiting media details page:
  > Whether by search or other means of navigating, the media details page displays all information for a piece of media.
  > You can also read all of the reviews for this media, and like and delete like you would anywhere else.
  > This is also where a user leaves a review. See below: 
  
  - User Leaving A Review:
  > Get to media details page by either searching or clicking thru
  > Go to bottom of page, hit "Write Review" to display the review form.
  > Title cannot exceed 100 characters, body cannot exceed 500. Rating is 1-10
  > If all data is valid, submit! User will be redirected to their profile, where the newly written review will be displayed at the top of the page.
  
  - Following/Unfollowing a User: 
  > Navigate to a user's page, and there will be a follow button in with their details.
  > If you already follow them, the button text will read "Following". Click to unfollow.
  > Click it again to follow them.
  > Now, if this user has any posts, they will show up on your homepage.
  
  - Liking a Review:
  > Anywhere where reviews exist on the site, a logged in user will have the ability to like them, using a heart button.
  > If the heart is red, you already like it. If you click it, it will unlike the review.
  > Just like the follow button, you can click again to like it. 
  > Now, this post will show up at the top of your "likes" section.
  
  - Deleting a Review:
  > The evil twin for the like button, the delete button, appears on any review that the logged in user themselves has posted.
  > A simple click on the trash can icon deletes the review forever.
  
  
