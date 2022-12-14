import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.query.id as string,
        },
        include: {
          followers: {
            include: {
              follower: true,
            },

            orderBy: {
              created_at: "desc",
            },
          },
          following: {
            include: {
              follower: true,
              following: true,
            },

            orderBy: {
              created_at: "desc",
            },
          },
          tweets: {
            include: {
              media: true,
              author: true,
              likes: {
                include: {
                  tweet: true,
                  user: true,
                },
              },
            },

            orderBy: {
              created_at: "desc",
            },
          },
          likes: {
            include: {
              tweet: {
                include: {
                  media: true,
                  author: true,
                  likes: true,
                },
              },
              user: true,
            },

            orderBy: {
              created_at: "desc",
            },
          },
        },
      });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (method === "PUT") {
    const { name, bio, location, website, banner, avatar, userId } = req.body;

    try {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          description: bio,
          location,
          url: website,
          profile_banner_url: banner,
          profile_image_url: avatar,
        },
      });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
