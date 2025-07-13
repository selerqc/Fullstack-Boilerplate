import { StatusCodes } from "http-status-codes";


function ValidateRequestBody(joiInstance) {
  return async (req, res, next) => {
    try {
      await joiInstance.validateAsync(req.body);
      return next();
    } catch (err) {
      next(err)
    }
  };
}
export {
  ValidateRequestBody
}


