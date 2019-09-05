pipeline {
    agent any
	tools {nodejs "node"}
	stages {
		stage('Install dependencies') {
			steps {
				sh 'npm install'
			}
		}
		stage('Build') {
			steps {
				sh 'npm run build'
			}
		}
		stage('Deploy to http://192.168.200.238:8098/') {
			agent any;
			steps {
				echo 'Deployando web...'
				sh 'chmod 777 ./dockerfiles/build-image.sh'
				sh 'chmod 777 ./dockerfiles/run-image.sh'
				sh './dockerfiles/build-image.sh'
				sh './dockerfiles/run-image.sh 8098'
			}
		}
	}
	/*post {
		success {
            slackSend channel: '#general',
                  color: '#02fe6b',
                  message: "Nuevo deploy del frontend de devscore (${currentBuild.fullDisplayName}) disponible en http://10.10.40.20:8098"
        }
        failure {
            slackSend channel: '#devs',
                  color: '#FF0000',
                  message: "Devscore pipeline ${currentBuild.fullDisplayName} falló. Por favor revisar: Job ${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})"
        }
    }*/
	
}