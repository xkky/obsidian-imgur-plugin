import { UploadStrategy } from './UploadStrategy'

export interface ImgurPluginSettings {
  uploadStrategy: UploadStrategy
  clientId: string
  proxy: string
  showRemoteUploadConfirmation: boolean
  albumToUpload: string | undefined
}

export const DEFAULT_SETTINGS: ImgurPluginSettings = {
  uploadStrategy: 'ANONYMOUS_IMGUR',
  clientId: null,
  proxy: undefined,
  showRemoteUploadConfirmation: true,
  albumToUpload: undefined,
}
