// Jenkinsfile
pipeline {
    
    stages {
        stage('Build') {
            steps {
                echo 'Building ..'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying ..'
            }
        }
    }
}