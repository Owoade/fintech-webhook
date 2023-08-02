import { Response } from "express";

export default function respond( res: Response, payload: IRespond ){
  return res.status(payload.code).json({
    status_code: payload.code,
    status: [200, 201].includes(payload.code),
    data: payload.data,
    message: payload.message
  })
}

interface IRespond {
    code: number,
    message: string,
    data: any
}