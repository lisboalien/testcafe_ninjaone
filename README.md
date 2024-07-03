# testcafe_ninjaone
TestCafe project for NinjaOne

## Introduction
This project is made to test the applications on

### Prerequisites
**UI:**
[https://github.com/Yastrenky/devices-clientapp](https://github.com/Yastrenky/devices-clientapp)

**Server:**
[https://github.com/NinjaRMM/devicesTask_serverApp](https://github.com/NinjaRMM/devicesTask_serverApp)

So first make sure both of them are ON and running before running any tests of this project!

You also need to have Node.js installed into your machine, check out more in the page [Node.js](https://nodejs.org/en/download/package-manager)

### Setup
1. Clone the project

```bash
git clone git@github.com:lisboalien/testcafe_ninjaone.git
```

2. Enter into the cloned project folder

```bash
cd testcafe_ninjaone
```

3. Install the dependencies

```bash
npm install
```

4. Run the tests

To run all the tests into all the available browsers:
```bash
npm run test
```

To run all the tests only on chrome:
```bash
npm run test:chrome
```

To run all the tests in other browser you just need to replace `chrome` with any of the following values
```
[
    chrome:headless, 
    firefox, 
    firefox:headless, 
    safari
]
``` 

To run all the tests generating an html report at the end:
```bash
npm run test:report
```

It will generate a report under the folder 
```
./reports/reporter
```