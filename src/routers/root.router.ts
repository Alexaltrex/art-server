import {Router} from "express";
import {authRouter} from "./auth.router";
import {portfolioRouter} from "./portfolio.router";
import {categoryRouter} from "./category.router";
import {memberRouter} from "./member.router";
import {sliderRouter} from "./slider.router";
import {mailRouter} from "./mail.router";

export const rootRouter = Router();
rootRouter.get(
    "/",
    (req, res) => {
        return res.json({
            'api name': 'digital nova api',
            "/api2": "get: описание api",
            "/api2/hash/:password": "get: получить хеш пароля password (для разработки)",
            "/api2/login": "post: вход в учетную запись",
            "/api2/portfolio": "get: получить все порфолио",
            "/api2/portfolio/id": "post: создать порфолио",
        })
    }
);
rootRouter.use('/auth', authRouter);
rootRouter.use('/portfolio', portfolioRouter);
rootRouter.use('/category', categoryRouter);
rootRouter.use('/member', memberRouter);
rootRouter.use('/slider', sliderRouter);
rootRouter.use('/mail', mailRouter);
