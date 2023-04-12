import { Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export enum TokenError {
  RefreshAccessTokenError = 'RefresAccessTokenError'
}

export interface ExtendedToken extends JWT {
  accessToken: string
  refreshToken: string
  expiresAt: number
  user: User
  error?: TokenError

}

export interface ExtendedSession extends Session {
  accessToken?: string
  error?: TokenError
}
