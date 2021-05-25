pipeline {
  environment {
    registry = "0114135447/test"
    registryCredential = 'dockerhub'
    dockerImage = ''
    failureReportSubject = "${env.JOB_NAME} - Build # ${env.BUILD_NUMBER} - FAILURE!"
    adminEmails = "medokingdom7@gmail.com"
    applicationReleaseVersion = '1.0.0'
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git branch: 'main', credentialsId: 'git', url: 'https://github.com/MuhamedAbdalla/test.git'
      }
    }
    stage('Building image') {
      steps{
        script {
          catchError {
            dockerImage = docker.build registry + ":" + applicationReleaseVersion
          }
        }
      }
      // call if error occur while building the image
      post {
        failure {
          emailext subject: failureReportSubject, to: adminEmails, body: "Throwing exception: ${e.message} in build stage!"
        }
      }
    }
    stage('Pushing Image To Dockerhub') {
      steps{
        script {
          catchError {
            docker.withRegistry( '', registryCredential ) {
              dockerImage.push()
            }
          }
        }
      }
      post {
        failure {
          emailext subject: failureReportSubject, to: adminEmails, body: "Throwing exception: ${e.message} in Pushing stage!"
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        script {
          try {
            sh "docker rmi $registry:" + applicationReleaseVersion
          } catch(Exception e) {
            unstable("Warning: ${e.message}")
          }
        }
      }
    }
  }
}