node {
 
    def image = ''
    def imageName = "registry.healthlink.network/healthlink-dashboard:${env.BRANCH_NAME}.${env.BUILD_ID}"
 
    container('docker') {
        stage('Clone repo') {
            checkout scm
        }
 
        stage('Build docker image') {
            image = docker.build(imageName)
        }

        if (env.BRANCH_NAME == 'master') {
            stage('Push image to registry') {
                withDockerRegistry(credentialsId: 'regcred', url: 'https://registry.healthlink.network') {
                    image.push()
                    image.push('latest')
                }
            }

            stage('Test') {
                sh '''echo testing...'''
            }
 
            stage('Trigger new deployment in kubernetes') {
                container('kubectl') {
                    sh "kubectl set image deployment healthlink-dashboard healthlink-dashboard=${imageName} --namespace=default"
                }
            }
        }
    }
}
