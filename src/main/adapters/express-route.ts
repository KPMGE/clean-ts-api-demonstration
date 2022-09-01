import { Controler } from "../../presentation/protocols";
import { Request, Response } from 'express'

export const expressRouteAdapter = (controller: Controler) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {})
    }

    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode < 299) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }
    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message
    })
  }
}
