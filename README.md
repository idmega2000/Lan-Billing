# LAN-BILLING
A billing service to get the transaction billing infomation


Visit App [Here](http://143.244.179.38/lanister) 

|  Functionality     |Http Request   | Api endpoints    |
|  -------------     | ------------- | ---------------- |
| Add fee config Clinic | POST           | /fees         |
| Get billing fees | POST           | /compute-transaction-fee        |


# Notes

- The app uses absolute imports.
- The app also uses global exception error handling.
- All logic exceptions are thrown in service files(good practive for easy maintanance).

# Setup Project
To setup project
- clone project and cd into the folder
- run npm install
- set up the environment variable copy and update frome envsample
- start the app on dev with `npm run dev`


To run test
- run the test with `npm run test`

## Structure
- The applications are to uses an MVC Pattern. A pattern that makes different parts of the into components such as controller, services, and repository(data connection layer). The routes connect the different parts of the application(i.e route -> controller -> service) together.
- The controller: The controller file must not do too much, it should be in charge of calling the right service that performs the right operations and passes the response back to the route server(to the user).
- The Service: The service file is where the main action and logic happen. It is the file that makes the right decisions, calculations and operations. It makes the call to the database layer models. 
- The Repository: The database layer and object-oriented mapper Must be separated and used in the service file as an imported model. This is to ensure that the database/object mapper can be changed without much disruption in the application processes.
## Filename
- File names must be all Pascal Case for controller, service and repository(with file name same as the name of the default export) files without (_) or dashes (-), and no additional punctuation. Filenames’ extension must be .js. 
## File Structure
- Class base file and coding structure are advised. Therefore the file would contain a Class(which will be exported as a default class) and the class will have multiple static methods. Note that only one Class is allowed in a file.
- Variable Naming: All variables except a class naming must be in Cammel Case for controller, service and repositories, and no additional punctuation. A class is named in PascalCase. Constants or global non-changing variables are named in UPPER_CASE with an underscore separating each word.All static method names will be in camelCase.
## Code Commenting
- Every Class and Method must be commented on with JSDocs. 
- Methods: The JS docs must have the documentation for all the parameters of the methods. The method must have a description and expected response type
- Classes: All classes must be documented with JSDoc. There must be a description
- All other code that may be difficult to understand must be commented with a detailed explanation of what was done on the part of the code

