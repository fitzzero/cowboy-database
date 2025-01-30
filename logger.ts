type LogType = 'alert' | 'start' | 'success' | 'dev' | 'end'

interface LoggerOptions {
  type?: LogType
}

class Logger {
  private prefixIcons: Record<LogType, string> = {
    alert: '⚠ ',
    dev: '✎ ',
    end: '< ',
    success: '✔ ',
    start: '> ',
  }

  log(message: string, options?: LoggerOptions) {
    const prefix = options?.type ? this.prefixIcons[options.type] : ''
    console.log(`${prefix}${message}`)
  }

  alert(message: string, location: string) {
    this.log(`${location}:\n${message}`, { type: 'alert' })
  }

  dev(message: string, location: string) {
    if (process.env.NODE_ENV !== 'development') return
    this.log(`${location}: ${message}`, { type: 'dev' })
  }

  end(message: string, location: string) {
    this.log(`${location}: ${message}`, { type: 'end' })
  }

  start(message: string, location: string) {
    this.log(`${location}: ${message}`, { type: 'start' })
  }

  success(message: string, location: string) {
    this.log(`${location}: ${message}`, { type: 'success' })
  }
}

export const logger = new Logger()
