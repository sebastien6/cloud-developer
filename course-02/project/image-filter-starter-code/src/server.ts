import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import isURL from "validator/lib/isURL";
import morgan from 'morgan';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
var timeout = require('connect-timeout');

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  app.use(morgan('short'));
  app.use(timeout('10s'));

  const requireImageUrl = () => {return (req: Request, res: Response, next: NextFunction) => {
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

  // timeout('30s'), haltOnTimedout, 
  app.get("/filteredimage", requireImageUrl(), async ( req: Request, res: Response ) => {
    const filteredImagePath: string = await filterImageFromURL(req.query.image_url);

    res.sendFile(filteredImagePath, async(err) => {
      if(err) {
        res.status(500).end();
      }
      else {
        console.log('image %s processes successfuly', filteredImagePath)
      }
    });

    res.on('finish', () => {
      deleteLocalFiles([filteredImagePath]);
      console.log('image %s deleted successfuly', filteredImagePath)
    })
  
 });
  //! END @TODO1
  
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: Request, res: Response ) => {
    res.status(200).send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();