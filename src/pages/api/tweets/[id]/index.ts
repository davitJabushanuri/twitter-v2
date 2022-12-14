import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function Tweet(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    try {
      const tweet = await prisma.tweet.findUnique({
        where: {
          id: req.query.id as string,
        },
        include: {
          author: true,
          likes: true,
          media: true,
        },
      });
      res.status(200).json(tweet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
