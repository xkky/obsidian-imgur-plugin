import AuthenticatedImgurClient from '../../imgur/AuthenticatedImgurClient'
import ImageUploader from '../ImageUploader'

export default class ImgurAuthenticatedUploader implements ImageUploader {
  private proxy: string
  constructor(readonly client: AuthenticatedImgurClient) {}

  async upload(image: File, albumId?: string): Promise<string> {
    const proxy = this.client.getProxy()
    const link = (await this.client.upload(image, albumId)).data.link
    return proxy ? link.replace('https://i.imgur.com', proxy) : link
  }
}
