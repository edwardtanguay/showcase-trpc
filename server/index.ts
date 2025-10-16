import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { z } from "zod";
import { db } from "./db";
import { publicProcedure, router } from "./trpc";

const appRouter = router({
	getInfo: publicProcedure.query(() => {
		return { name: "tRPC server", version: "0.1" };
	}),
	getUsers: publicProcedure.query(async () => {
		const users = await db.user.findMany();
		return users;
	}),
	userById: publicProcedure.input(z.string()).query(async (opts) => {
		const { input } = opts;
		const user = await db.user.findById(input);
		return user;
	}),
	userCreate: publicProcedure
		.input(z.object({ name: z.string() }))
		.mutation(async (opts) => {
			const { input } = opts;
			const user = await db.user.create(input);
			return user;
		}),
});

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
app.use("/trpc", createExpressMiddleware({ router: appRouter }));

const port = 3447;
app.listen(port, () => {
	console.log(`tRPC Express server listening on http://localhost:${port}`);
});
