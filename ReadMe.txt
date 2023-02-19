#Security best practice
1. strongly encrypt passwords with salt and hash(bcrypt) that is provided in course
2. strongly encrypt password reset tokens (sha 256)

#prevent brute force attaks
1. use bcrypt (to make login requests slow)
2. implement rate limiting (express-rate-limit)
3. implement maximum login attempts

#CROSS SITE SCRIPTING (XSS) ATTACKS
1. store jwt in http only cookies 
2. senitize user input data
3. set special HTTP headers (helmet package)

#DENIAL OF SERVICE (DOS) ATTACKS
1. Implement rate limiting (express-rate-limit)
2. Limit body payload ( in body-parser)
3. Avoid evil regular expressions 

#NOSQL QUERY INJECTION
1. Use mongose for Mongodb (because of Schematypes)
2. Senitize user input data

#Other best practices and suggestions
1. Always use HTTPS	
2. Create random password reset tokens with expiry dates
3. Deny access to jwt after password change 
4. Don't commit sensitive config data to Git
5. Don't send error details to clients
6. Prevent Cross Site Request Forgery (csurf package)
7. Requre re-authentication before a high-value action
8. Implement a blacklist of untruested jwt
9. Confirm user email address after first creating account
10. Keep user logged in with refresh tokens 
11. Implement two-factor authentication
12. Prevent parameter pollution causing Uncaught Exceptions



