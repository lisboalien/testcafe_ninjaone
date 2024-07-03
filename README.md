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

## About the tests
### Test 01

```
. Make an API call to retrieve the list of devices.
· Use the list of devices to check the elements are visible in the DOM. Check the name, type and capacity of each element of the list using the class names and make sure they are correctly displayed.
· Verify that all devices contain the edit and delete buttons.
```

This is being tested by the test `Checking Devices List`.

### Test 02
```
· Verify that devices can be created properly using the UI.
· Verify the new device is now visible. Check name, type and capacity are visible and correctly displayed to the user.
```

This is being tested by the dinamic generated tests `Create a new device - '${type}'`.

I decided to test all the 3 types of devices because there is a difference into the behavior, maybe this could be a bug, when creating a device with the type **WINDOWS SERVER**, that appears with an underscore into the device card (**WINDOWS_SERVER**).

So this way I am covering the known possibilities of errors into the device creation.

### Test 03
```
· Make an API call that renames the first device of the list to “Renamed Device”.
· Reload the page and verify the modified device has the new name.
```

Here I am sorting the endpoint result first because we cannot garantee that the json result has the same order as the one shown into the html.

Then I verify if the register was renamed with the API, because this validation is stronger validating by id.

After that I sort the devices list by the same order I sorted the endpoint results to check if the first card was really renamed. 

I didn't choose to verify the entire list because it is possible to have more than one device with the same name.

### Test 04
```
· Make an API call that deletes the last element of the list.
· Reload the page and verify the element is no longer visible and it doesn’t exist in the DOM.
```

The same way as rename, I sorted both the endpoint and the UI to be sure that they are showing the same order of registers to see if the last device was really deleted.

As it is not impossible to have 2 devices with different names but same types and capacity, I am not checking the type and capacity to see if they are not the same as the deleted one.

### General comments
I put this `getTestCounter()` function at the beggining of the test name to make it better to see in reports, specially if we have dinamically generated tests. 

The problem is that with testcafe extensions it makes it difficult to see the test names, so I left it like that for now until I see a better solution.