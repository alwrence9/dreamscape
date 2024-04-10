# Dreamscape

## Website url:
https://dreamscape-project.azurewebsites.net/

## Setup Steps

#### MongoDB Atlas setup steps.

- In MongoDB create a collection called Dreamscape.

- The website provides a URI to connect. Copy this URI into a .env file and save to a variable called ATLAS_URI.

- In the URI, replace &lt; password &gt; with your user's password. 

- In the URI, you should see a section that looks like "mongodb.net/?retryWrites=true&w=majority". Add the name of the collection before the question mark. ex: "mongodb.net/Dreamscape?retryWrites=true&w=majority"

## Run Steps

#### From Application Root.

- npm run build. Installs dependencies, builds client app and generates a .env file.

- The MongoDB website provides a URI to connect. Copy this URI into the .env file and save to a variable called ATLAS_URI.

- In the URI, replace &lt; password &gt; with your user's password. 

- In the URI, you should see a section that looks like "mongodb.net/?retryWrites=true&w=majority". Add the name of the collection before the question mark. ex: "mongodb.net/Dreamscape?retryWrites=true&w=majority"

- npm run start. Runs application through server/bin/www.js

## Manual Redeployment
First login in azure cli
```
az login
```
Build the project
```
npm run build
```
Put all the files in a zip file named deploy.zip

Then deploy the zip file to azure.
```
az webapp deployment source config-zip --resource-group Dreamscape --name Dreamscape-project --src deploy.zip
```
