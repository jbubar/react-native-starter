# Todo List

By Mackenzie Browne

## Intro

Greetings! Welcome to my Todo List. I wanted to use this opportunity to build a starter-react-native project that I can use in the future as a starting point for new App projects.

## Getting started

- Follow [React Native Environment Setup](https://reactnative.dev/docs/environment-setup). Use instructions for Vanilla React Native, not Expo.
- Install dependencies with `npm install` or `yarn install`. This will also run `pod install` automatically.
- Run android or ios with `yarn ios` or `yarn android`

## Objectives

**1. Create an item (with a short description) on my list of todos.**

- Use the Input bar at the bottom of the screen.

**2. Mark an item as completed.**

- Click the icon box beside a todo, or click the don checkmark after clicking the body of the todo.

**3. Edit the description of an existing item.**

- Click the body of the Todo Item to open and edit. Cancel / Save actions available.

**4. Delete an item from the list entirely.**

- Open the item and click the trash can.

**5. Create another list of todos and select a list from my collection of lists.**

- Open the menu using the top-left icon in the Navbar. Create and Select functionality available.

**6. Move an item from one list to another.**

- NOT DONE - maybe we can work on this together?

**7. Synchronize lists and todo items between multiple devices.**

- Used firebase snapshot listeners from the very beginning. The data auto-syncs with the db and other devices

**8. Set a deadline on any of my items and clearly see when an item is overdue.**

- Click the body of the Todo Item to set a Due Date. Item shows 'OVERDUE' in red when the date has past.

## Learnings and Trade-Offs

**Didn't use realm**

- I wanted to use MongoDB and Realm
- I realised early that I would be unhappy about doing things 'a working way' instead of 'the right way'.
- I am most interested in using Realm as a GraphQL server with User Authentication. However, there was a lot to learn and this wouldn't be the best example of my work
- For this reason, I used [firebase](https://firebase.google.com/). I'm very familiar with it and have been using for several years.

**Didn't use expo**

- I hope I can still use MongoDB realm one day, so for that reason i did not take advantage of some of the conveniences of Expo.

**I wanted to learn UI Kitten**

- I had heard about UI Kitten from a friend over a year ago.
- I still haven't had a chance to try it. Now was a good time.
- It was a great experience!

**Provider-Based Unit Testing**

- I want to write `provider-based` unit tests similar to how you write tests for apps using Apollo and Hooks.
- I tried setting up the tests early so I could test as I go. This took a bit of time to get working in a way I was happy.
- Wanted to write more tests, decided to write a few more features in interest of time.

**Should write more tests**

- I started writing each feature with tests before moving on to the next feature. I wanted to continue this effort. In the interest of time, I decided to complete basic functionality of more features while still providing of an example of how I would unit test my components.
- I can test my contexts as well, but most of that is just testing the functionality of firebase API requests. There is still a bit of local functionality I should test in the contexts. I would use the same `provider-based` approach.

**Android Problem 1 - Configuration variables and API keys are hard-coded**

- I wanted to use a standardized way of storing my configuration variable.
- Bring some 12 factor good-ness to my app.
- I used [react-native-config](https://github.com/luggit/react-native-config) to support dotenv files.
- [There are currently problems on android](https://github.com/luggit/react-native-config/issues?q=is%3Aissue+is%3Aopen+android+empty) which is unfortunate. I've had very good experienced with this plugin over the last year. In the interest of time, I stopped using it making some of my API keys hard-coded.
- The API keys that are included are not secrets so its not really a problem, just not a practice that I'm super happy about.

**Android Problem 2 - Connectivity with Firebase**

- I did a lot of development through the iOS simulator.
- Checking Android and the data was not loading on both the simulator and the device.
- Had to use [firebase long polling](https://github.com/firebase/firebase-js-sdk/issues/1674) to fix the issues with Android and firebase-js.

## Features

- Uses [React Native](https://reactnative.dev/) to build a hybrid mobile app.
- Uses [UI Kitten](https://akveo.github.io/react-native-ui-kitten/) for UI
- [Firebase](https://firebase.google.com/) for backend API and Database. Also will use for users / auth.
- [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) for static code analysis.
- [Typescript](https://www.typescriptlang.org/) is lightly used. Mostly utilizing the auto-complete features to make development faster, less about strict types within the app itself.
- [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://typicode.github.io/husky/#/) to automate static-code analysis and code formatting.

## Architectural Decisions

- Using hooks internally in components for internal state.
- Using Context / Providers with hooks for global state management.
- Also Using Context / Providers with hooks for API access as well.
- All global/shared dependencies on a component are imported via hook/provider so for each Context
- a mockProvider can easily wrap unit tests to make them very easy to setup and mock all external dependencies. This also makes it suitable for continuous integration environments.
- I understood the goal would be multiple lists and even potentially multiple users, when the app only had a single list, everything was hard-coded to `list #1` to make it easier to enable later without major data migrations.

## Known Needed Improvements and Bugs

- Feature - Move item to another list
- Feature - Delete / Edit List
- Android and iOS Needs More Testing - KeyboardAvoidingView
- Splash Screens / Icons
- App Name / Package ID
- User / Auth to make it a real app
- Sorting
- Limiting Field Lengths
- More Unit Tests
- Simulator Integration Tests with Detox / Appium
- Empty List State
- Use react-hook-form to cleanup code for forms
- Typescript could be more complete
- Code coverage tooling / badges on github
- Dependabot, Run Tests, Auto Deployment

## Other commands

- `start`: Run metro bundler server on its own. Useful when you want to run the server without rebuilding.
- `test`: Run unit tests in jest.
- `lint`: Static code analysis. Run with `--fix` to auto-fix most issues.
