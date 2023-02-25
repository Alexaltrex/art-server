import {Router} from "express";
import {sliderController} from "../controllers/slider.controller";
import {accessTokenHandler} from "../middlewares/accessTokenHandler";
import {uploadSingle} from "../middlewares/upload";

export const sliderRouter = Router();
sliderRouter.get('/', sliderController.getAll);
sliderRouter.get('/id/:id', sliderController.getSliderById);
sliderRouter.put('/id/:id', [accessTokenHandler, uploadSingle], sliderController.addSlideToSlider);
sliderRouter.delete('/id/:id/slide/:slideId', [accessTokenHandler], sliderController.deleteSlideFromSlider);
sliderRouter.put('/order/:sliderId', [accessTokenHandler], sliderController.changeSlidesOrder);

