import { Router, type IRouter } from "express";
import healthRouter from "./health";
import solutionsRouter from "./solutions";
import industriesRouter from "./industries";
import testimonialsRouter from "./testimonials";
import articlesRouter from "./articles";
import eventsRouter from "./events";
import inquiriesRouter from "./inquiries";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(solutionsRouter);
router.use(industriesRouter);
router.use(testimonialsRouter);
router.use(articlesRouter);
router.use(eventsRouter);
router.use(inquiriesRouter);
router.use(adminRouter);

export default router;
