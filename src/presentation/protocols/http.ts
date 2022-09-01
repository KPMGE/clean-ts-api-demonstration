export type HttpResponse = {
  statusCode: number
  body: any
}

export interface Controler<T = any> {
  handle(data: T): Promise<HttpResponse>
}
