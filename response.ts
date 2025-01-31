import { logger } from './logger'

export interface CowboyResponse<T> {
  code?: string
  data: T | null
  message?: string
}

export interface UserReqProps {
  userId: string
}

export type UserAction<T, R> = (
  prevData: CowboyResponse<T | null>,
  data: R & UserReqProps
) => Promise<CowboyResponse<T | null>>

export class CowboyResHandler {
  handle500(message: string): CowboyResponse<null> {
    logger.alert(message, 'response')
    return {
      code: '500',
      data: null,
      message: message || 'Internal Server Error',
    }
  }

  handle403(message: string): CowboyResponse<null> {
    logger.alert(message, 'response')
    return {
      code: '403',
      data: null,
      message: message || 'Forbidden',
    }
  }

  handle200<T>(data: T, message?: string): CowboyResponse<T> {
    return {
      code: '200',
      data,
      message: message || 'OK',
    }
  }
}

export const resHandler = new CowboyResHandler()
