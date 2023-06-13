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
      "Tip of the day: If you are confused between Composition and Inheritance to solve a problem - Always go with Composition pattern. Composition gives more flexibility because it is loosely coupled and Inheritance is tightly coupled.",
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
      "Good morning, world! ☀️ Starting the day with a cup of coffee and a heart full of gratitude. There's something magical about the quiet moments before the chaos begins. Embrace the day, chase your dreams, and let positivity guide you. Remember, every day is a chance for a fresh start! ✨❤️",
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
      "For those wondering how to write, start to write. And think. Watch how you think. Watch how things are. Connect the dots and you will get a point of view to share. Don't try to impress, try to present - put forward things.",
    image: "",
    imageAlt: "",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: "2022-11-10",
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
