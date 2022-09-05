# parKing - park like a king!

parKing is a project using the MERN stack made to help you find your next parking spot! This repository is the frontend side of the app, for the backend side [click here](https://github.com/leopariente/parking-locator-server)
## Installation

* Clone this repo and the [server repo](https://github.com/leopariente/parking-locator-server).
* In both terminals run 'npm ci'
* In both terminals run 'npm start

## How to use

When you first enter the app you will see a map with markers on it. Each marker is a parking spot uploaded by another user with the following details:
* Car model
* Car color
* Time the car leaves
* License plate (optional)
* Phone number (optional)

To upload a parking spot all you need to do is login and click the map where your car is.

## TODO
* add unit tests where you can
    * use mocks to mock the server. the project should be able to test itself without the server
* setup CI/CD code prettifier
* add .editorconfig file that corresponds your eslint
* add build into docker
* add deploy onto aws. the common use case is to use boto3 library (python)
    * when deploying, add https server proxy (like nginx) in front of your app, then you don't have to deal with certificate negotiation on your own (it will be transparent)
* add end-to-end tests (if you stick with the splitted projects, you can add another project that tests them together as a whole)
* add LICENSE file (you can use MIT which is highly permissive)
* add Contributing section to README.md with instructions how to add code
* add instructions how to run the tests to README.md
* update all packages to the latest supported version to avoid having any vulnerabilities because of old revisions of dependencies