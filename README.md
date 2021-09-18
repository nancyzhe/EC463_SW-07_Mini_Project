# EC463: SW Mini Project
**Team: SW-07**


### Team Members:
* **Haoxuan Li** - [HaoxuanLi123](https://github.com/HaoxuanLi123)
* **Nancy Zheng** - [nancyzhe](https://github.com/nancyzhe)

### Table of Contents:

* [Project Overview](#projectoverview)
* [How to Run](#how_to_run)
* [Design Decisions](#design_decisions)
* [Testing](#testing)


<a name="projectoverview"></a> 
#### Project Overview: ####
* A cross-platform mobile application that allows the user to scan food items and check the nutritional information. 
* Complete signin, signup, and logout functionality.
* Designed with REACT Native to offer a seamless transition from screen to screen.
* Utilizes the FDA API which returns details on a particular food.


<a name="how_to_run"></a> 
#### How to Run: (Assuming that you have Node 12 LTS or greater installed) ####

1. Install Expo CLI command line utility. 
    ```
     npm install -g expo-cli
    ```
2. Install the [Expo Go App](https://expo.dev/client) on your mobile device.

2. Clone the responsitory using the following command in your terminal.
    ```
    git clone https://github.com/https://github.com/nancyzhe/EC463_SW-07_Mini_Project.git
    ```
3. Switch into the project directory.
    ```
    cd EC463_SW-07_Mini_Project
    ```
4. Install the necessary packages.
    ```
    npm install
    ```
5. Start the project.
    ```
    expo start
    ```
6. Using your phone's camera, scan the QR code provided.

7. Sign-in with an existing account *or* sign-up if you do not have an account (password must be at least six characters).

8. Start scanning!

<a name="design_decisions"></a> 
#### Design Decisions: ####
* Frontend: React Native Expo CLI
* Backend: NodeJS
* Sign-in/Sign-up Authentication: Firebase Console
* Camera/Barcode Scanner: [expo-barcode-scanner](https://docs.expo.dev/versions/latest/sdk/bar-code-scanner/)


<a name="testing"></a> 
#### Testing: ####

