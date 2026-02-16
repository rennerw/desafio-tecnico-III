type Status = 'success' | 'error' | 'fail';

export interface ReturnMessage {
  httpCode: number;
  status: Status;
  message: any;
}