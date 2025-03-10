module.exports = {
  apps: [
    {
      name: 'ai-batch-reader',
      script: './index.js',
      instances: 2,
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      watch: false,
      ignore_watch: ['node_modules', 'logs', '*.log', '.git'],
      env: {
        NODE_ENV: 'production',
        PORT: 3015,
      },
    },
  ],
};
