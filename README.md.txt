
Website name is: "click fit".
The website is  a sport website, with some fitness things.


Has animation in the design that will look nice to the user.
The UI is  responsive, using only CSS, Javascript, HTML, Bootstrap, JQuery and JQuery plugins.

On the main page, after the load add jquery ajax call to this rest interface http://numbersapi.com/1/30/date?json get the content and display it.
There is a place in the main page that you can drag and drop images or click on it, and then you can upload images to the server. 

The backend part in Nodejs, and it just upload  to a "upload_images" folder in the root of the project .
Backend and MySQL task please create a script with:

Creation of users table with columns:
`ID` INT NOT NULL AUTO_INCREMENT
`email` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL
`password` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL
`type` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL
`active` TINYINT default 1

Create stored procedure `addUser` to instert new user + write call to stored procedure `addUser` that will insert new user

