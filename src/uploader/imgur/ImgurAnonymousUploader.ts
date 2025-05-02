import { requestUrl } from 'obsidian'

import { handleImgurErrorResponse } from '../../imgur/AuthenticatedImgurClient'
import { IMGUR_API_BASE } from '../../imgur/constants'
import { ImgurPostData } from '../../imgur/imgurResponseTypes'
import prepareMultipartRequestPiece from '../../utils/obsidian-http-client'
import ImageUploader from '../ImageUploader'

export default class ImgurAnonymousUploader implements ImageUploader {
  private readonly clientId!: string
  private proxy!: string
  constructor(clientId: string, proxy: string) {
    this.clientId = clientId
    this.proxy = proxy
  }

  async upload(image: File): Promise<string> {
    const requestData = new FormData()
    requestData.append('image', image)

    const request = {
      url: `${this.proxy ? this.proxy + '/3' : IMGUR_API_BASE}/image`,
      method: 'POST',
      headers: { Authorization: `Client-ID ${this.clientId}` },
      ...(await prepareMultipartRequestPiece(requestData)),
      throw: false,
    }

    const resp = await requestUrl(request)

    if (resp.status >= 400) {
      handleImgurErrorResponse(resp)
    }
    const link = (resp.json as ImgurPostData).data.link
    return this.proxy ? link.replace('https://i.imgur.com', this.proxy) : link
  }
}
