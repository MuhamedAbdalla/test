pipeline {
  environment {
    registry = "01141354474/test"
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
        script {
          try {
            git branch: 'main', credentialsId: 'git', url: 'https://github.com/MuhamedAbdalla/test.git'
          } catch (Exception e) {
            unstable("Warning: ${e.message}")
          }   
        }
      }
    }
    stage('Building image') {
      steps {
        script {
          catchError {
            dockerImage = docker.build registry + ":" + applicationReleaseVersion
          }
        }
      }
      post {
        failure {
          emailext (subject: failureReportSubject, to: adminEmails, replyTo: adminEmails, body: "There is a failure in build stage.\nCheck the logs now!", attachLog: true)
        }
      }
    }
    stage('Pushing Image To Dockerhub') {
      steps {
        script {
          try {
            docker.withRegistry( '', registryCredential ) {
              dockerImage.push('latest')
            }
          } catch(Exception e) {
            unstable("Warning: ${e.message}")
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps {
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