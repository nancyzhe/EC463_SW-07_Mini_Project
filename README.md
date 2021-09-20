# EC463: SW Mini Project
**Team: SW-07**


### Team Members:
* **Haoxuan Li** - [HaoxuanLi123](https://github.com/HaoxuanLi123)
* **Nancy Zheng** - [nancyzhe](https://github.com/nancyzhe)

### Table of Contents:

* [Project Overview](#projectoverview)
* [Project Architecture](projectarchitecture)
* [How to Run](#how_to_run)
* [Design Decisions](#design_decisions)
* [Testing](#testing)


<a name="projectoverview"></a> 
#### Project Overview: ####
* A cross-platform mobile application that allows the user to scan food items and check the nutritional information. 
* Complete signin, signup, and logout functionality.
* Designed with REACT Native to offer a seamless transition from screen to screen.
* Utilizes the FDA API which returns details on a particular food.




<a name="projectarchitecture"></a> 
#### Project Architecture: ####
![Project Architecture](https://github.com/nancyzhe/EC463_SW-07_Mini_Project/blob/main/barcode%20app%20structure.png)



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
1. Started with enabling barcode scanning functionality
[Camera Test](https://github.com/nancyzhe/EC463_SW-07_Mini_Project/blob/main/camera_test.JPG)
[Camera Test2](https://github.com/nancyzhe/EC463_SW-07_Mini_Project/blob/main/camera2.JPG)
2. Then we discussed and tried to implement a double-button design on the pop-up alert
[Double Button Test](https://github.com/nancyzhe/EC463_SW-07_Mini_Project/blob/main/double_button_test.JPG)
3. At the same time, we implemented a better UI design by using Tab navigator
[Tab Test](https://github.com/nancyzhe/EC463_SW-07_Mini_Project/blob/main/Stack1.PNG)
[Tab Test2](https://github.com/nancyzhe/EC463_SW-07_Mini_Project/blob/main/Stack2.PNG)
4. We also uses nested Stack navigator inside tabs. At this time, we also implemented FDC API functionality
[API & Stack Test](https://github.com/nancyzhe/EC463_SW-07_Mini_Project/blob/main/FDC_API.PNG)
