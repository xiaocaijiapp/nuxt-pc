module.exports = {
  apps: [{
    name: 'stardaypc3',
    exec_mode: 'cluster',
    out_file: './logs/out-0.log',
    error_file: './logs/err-0.log',
    merge_logs: true,
    instances: '4', // Or a number of instances
    script: './node_modules/nuxt/bin/nuxt.js',
    args: 'start', // 运维传递参数位置
    log_data_format: 'YYYY-MM-DD HH:mm Z',
    autorestart: true,
    watch: [
      '.nuxt',
      'nuxt.config.js'
    ],
    watch_delay: 1000,
    ignore_watch: [
      'node_modules'
    ],
    watch_options: { // 监听配置
      followSymlinks: false,
      usePolling: true
    },
    max_memory_restart: '5G',
    node_args: '--harmony'
  }
  ]
}
