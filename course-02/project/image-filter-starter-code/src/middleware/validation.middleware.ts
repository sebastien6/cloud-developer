import { NextFunction, Request, Response } from 'express';
import isURL from "validator/lib/isURL";

const validationImageURL = () => {return (req: Request, res: Response, next: NextFunction) => {
    const imageUrl = req.query.image_url;

    if (!imageUrl) {
      return res.status(400).send({ message: 'Image url is required' });
    }
    
    if (!isURL(imageUrl)) {
      return res.status(400).send({ message: 'Invalid url format passed as argument' });
    } else {
      next();
    }
}};

export default validationImageURL;

