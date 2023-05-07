module.exports = {
  apps: [
    {
      name: 'app',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
