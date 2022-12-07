pipeline {
	agent any
	parameters {
        choice(name: 'ENV', choices: ['dev', 'qa', 'stg' , 'prod'], description: 'Select Environment')
    }
	stages {
		stage('Install Dependencies'){
				steps{
					bat 'npm install'
				}
		}
		stage('Run Tests'){
				steps{
					bat "npm run test:${params.ENV}:cucumber"
				}
		}
		stage('Publish HTML Report'){
				environment {
					REPORT_DIR = 'allure-report'
					REPORT_FILES = 'index.html'
				}
				steps{
					publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: "${REPORT_DIR}", reportFiles: "${REPORT_FILES}", reportName: "${env.BUILD_TAG}-HTML-Report", reportTitles: ''])
				}
		}
	}
}