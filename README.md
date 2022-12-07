# planit-assessment-bdd

## How to run in local machine

- ## 💻 Pre-requisites
  - Git Bash
  - Node JS
  - Java 8 or higher - for Allure Reporter

## 1. Clone the project

       git clone https://github.com/kentdomaoal/planit-assessment-bdd.git
       
       cd planit-assessment-bdd

## 2. Install dependencies

       npm install
    
## 3. Run the test
   
        npm run test:qa:cucumber
        
## 4. View html report
   
   It can be found on `/allure-report/index.html`
       
   Or you can run this command to open the allure generated report
       
       npx allure open allure-report
