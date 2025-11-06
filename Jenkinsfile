pipeline {
  agent any

  options {
    buildDiscarder(logRotator(numToKeepStr: '10'))
    timeout(time: 1, unit: 'HOURS')
    timestamps()
  }

  stages {
    stage('Checkout') {
      steps {
        echo '📥 Clonage du repository...'
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        echo '📦 Installation des dépendances...'
        bat 'npm install'
      }
    }

    stage('Install Browsers') {
      steps {
        echo '🌐 Installation des navigateurs Playwright...'
        bat 'npx playwright install chromium webkit'
      }
    }

    stage('Run Tests') {
      steps {
        echo '🧪 Exécution des tests Playwright...'
        bat 'npx playwright test --project=chromium --project=webkit'
      }
    }

    stage('Generate Allure Report') {
      steps {
        echo '📊 Génération du rapport Allure...'
        bat 'npx allure generate allure-results --clean -o allure-report'
      }
    }

    stage('Publish Reports') {
      steps {
        echo '📤 Publication des rapports...'
        publishHTML([
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Report'
        ])
        
        publishHTML([
          reportDir: 'allure-report',
          reportFiles: 'index.html',
          reportName: 'Allure Report'
        ])
      }
    }
  }

  post {
    always {
      echo '🧹 Nettoyage et archivage...'
      
      junit testResults: 'test-results/**/*.xml', allowEmptyResults: true
      
      archiveArtifacts artifacts: 'test-results/**/*,allure-results/**/*', allowEmptyArchive: true
      
      cleanWs()
    }

    success {
      echo '✅ Pipeline réussi !'
      mail to: 'Hakimsahraoui.de@gmail.com',
           subject: "✅ Jenkins Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
           body: "Les tests Playwright ont réussi.\n\nConsulte le rapport: ${env.BUILD_URL}"
    }

    failure {
      echo '❌ Pipeline échoué !'
      mail to: 'Hakimsahraoui.de@gmail.com',
           subject: "❌ Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
           body: "Les tests Playwright ont échoué.\n\nVérifier les logs: ${env.BUILD_URL}"
    }
  }
}
