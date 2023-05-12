module.exports = {
  apps: [
    {
      name: 'app',
      script: 'npm',
      args: 'run start:dev',
      env: {
        NODE_ENV: 'development',
        MONGO_HOST: 'feeding.bmjaab8.mongodb.net',
        MONGO_PASSWORD: 'odK2DulxtOedDhoT',
        MONGO_USER: 'feedingmind_user',
        MONDO_DB: 'dev',
        MAIL_HOST: 'smtp.gmail.com',
        MAIL_PORT: 465,
        MAIL_USERNAME: 'janasarii@gmail.com',
        MAIL_PASSWORD: 'zkmqbgkmvhrnehil',
        MAIL_SECURE: true,
        MAIL_FROM_ADDRESS: 'janasarii@gmail.com',
        MAIL_FROM_NAME: 'Feeding Minds',
        PORT: 5000,
        JWT_KEY: 'QWEQWEQWE',
        JWT_KEY_REFRESH: 'ASDASDASD',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
