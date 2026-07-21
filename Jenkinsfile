pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "307484794886"

        FRONTEND_REPO = "frontend-repo"
        BACKEND_REPO = "backend-repo"

        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Rathnam09/three-tier-task-manager.git'
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                cd frontend
                npm install
                '''
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                cd backend
                npm install
                '''
            }
        }

        stage('Docker Login') {
            steps {
                sh '''
                aws ecr get-login-password --region us-east-1 | \
                docker login --username AWS \
                --password-stdin 307484794886.dkr.ecr.us-east-1.amazonaws.com
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker build -t frontend-repo ./frontend

                docker build -t backend-repo ./backend
                '''
            }
        }

        stage('Tag Images') {
            steps {
                sh '''
                docker tag frontend-repo:latest \
                307484794886.dkr.ecr.us-east-1.amazonaws.com/frontend-repo:latest

                docker tag backend-repo:latest \
                307484794886.dkr.ecr.us-east-1.amazonaws.com/backend-repo:latest
                '''
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                docker push \
                307484794886.dkr.ecr.us-east-1.amazonaws.com/frontend-repo:latest

                docker push \
                307484794886.dkr.ecr.us-east-1.amazonaws.com/backend-repo:latest
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }

        failure {
            echo "Pipeline failed!"
        }
    }
}
