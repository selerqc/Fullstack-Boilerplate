import { StatusCodes } from "http-status-codes";


function ValidateRequestBody(joiInstance) {
  return async (req, res, next) => {
    try {
      await joiInstance.validateAsync(req.body);
      return next();
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: err.details ? err.details[0].message : err.message });
    }
  };
}
export {
  ValidateRequestBody
}


