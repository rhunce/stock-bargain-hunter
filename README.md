# Stock Bargain Hunter
Mini full-stack application connected to a 3rd party API to get real-time stock data and compare key stock value metrics to user-provided benchmarks.
​
## Getting Started
​
(1) Fork the repo and clone it down to your computer.

(2) Open it in VS Code (or whatever IDE you use) like you normally would.

(3) To be able to make HTTP requests to the API in this repo, you must create and use an Alpha Vantage API Token. Here is how to obtain your Token:
- Go to: https://www.alphavantage.co/
- Click "Get Your Free API Key Today"
- Follow the prompts and get your API key
- Make sure to copy it to a secure place

(4) In the main directory of the repository, make a copy of the "config_example.js" file and rename it to "config.js."

(5) In config.js, replace the empty string value of the API_KEY property of module.exports with your Alpha Vantage API Key (from step 3, above) as a string and make sure all changes up to this point are saved.

(6) In your terminal, from the root directory of the repository, run
​
```
npm install
```
(7) then run this to start your server
```
npm run start
```
​
(8) Now, type
```
localhost:3000
```
into your browser and hit ENTER. The application should open up.

(9) At this point you can explore the App by searching for a company via its Ticker Symbol, typing target values into the Target Column in the table to the top-right of the app, and so on.
​
Happy fun!