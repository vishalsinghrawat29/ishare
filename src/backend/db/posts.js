import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "If you have the morning slump, this is for you. Sometimes, even if we sleep for 10+ hours, we will stay wake up tired. There’s this common belief that basically says that the number of hours you sleep = your energy levels during the day. That’s partially true. There’s a lot more factors than just the number of hours you sleep. Some people can sleep 5 hours per night while feeling way more energised than some people who slept 10 hours.",
    image: "",
    imageAlt: "",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Bard just got a massive update, and it’s pretty impressive. The thing is, both ChatGPT and Bard are amazing at different purposes. ChatGPT crushes Bard at tasks like coding, mathematics and everything that requires deep reasoning. Especially since GPT-4. On the other hand, I found Bard to be way more useful for daily tasks that requires today’s informations, such as traveling tips, finding new places, searching the internet, etc. At the end of the day, the smartest thing to do is to use both of them for different usages.",
    image: "",
    imageAlt: "",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shubhamsoni",
    createdAt: "2022-01-10",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Don't hate errors and bugs. They're not your enemies. It's a part of your programming journey. See errors and bugs as a sign that you're pushing your boundaries. It shows growth.",
    image:
      "https://res.cloudinary.com/dogvmq3s7/image/upload/v1686580986/gttovlzh4fee8txsvdeh.jpg",
    imageAlt: "cld-sample",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "thevishal",
    createdAt: "2023-06-10",
    updatedAt: formatDate(),
  },
];
