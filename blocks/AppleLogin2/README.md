## Building Blocks React Native Mobile -  AppleLogin2

Building Blocks - React Native Master App - AppleLogin2

## Getting Started
Apple Login
Let your users log in using their Apple account details. No need to remember usernames and passwords.

### Prerequisites
The @invertase/react-native-apple-authentication library will not work if you do not ensure the following:

1.You are using React Native version 0.60 or higher.

2.iOS only You have setup react-native iOS development environment on your machine (Will only work on Mac). If not, please follow the official React Native documentation  

3.(iOS only) You are using Xcode version 11 or higher. This will allow you to develop using iOS version 13 and higher, when the APIs for Sign In with Apple became available

### Git Structure
N/A

### Installing
yarn add @invertase/react-native-apple-authentication

Link: https://github.com/invertase/react-native-apple-authentication

#### How to use this block in screen:

**Import view in render Method:**


    import AppleLogin2, { ButtonTitles } from "../../AppleLogin2/src/AppleLogin2";
    import { AppleLoginResponse } from "../../AppleLogin2/src/AppleLogin2Controller";

    <AppleLogin2
        testId="appleLogin"
        buttonTitle={ButtonTitles.continue}
        onPress = {this.appleViewPress}
        callback = {this.responseApple}
    />

**On button press, set actions which call, then after apple login flow start**

    appleViewPress = () => {
        //Set action on onpress like loader start
        //startLoading();
      };


 **Apple login process complete then it gives response as a callback**

    responseApple = (response: AppleLoginResponse | undefined) => {
        //Set action on onpress like loader stop
        //stopLoading();
        if (response) {
          if (response.success) {
            //set your require action
          } else {
            //Show message as per the error
            //set your require action
          }
        }
      };

**Note:** In this project, Used in email-account-login block

## Running the tests
yarn test

## CI/CD Details
N/A

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
