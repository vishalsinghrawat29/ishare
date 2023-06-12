import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    profileAvatar:
      "https://res.cloudinary.com/dogvmq3s7/image/upload/v1686489210/iShare/waz9ndhyvwua7m7fcply.png",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Vishal",
    lastName: "Rawat",
    username: "thevishal",
    password: "vishalRawat123",
    profileAvatar: "",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Navneet",
    lastName: "Kumar",
    username: "navneetkumar",
    password: "navneetKumar123",
    profileAvatar:
      "https://res.cloudinary.com/dogvmq3s7/image/upload/v1686487408/samples/people/kitchen-bar.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Surya",
    lastName: "Shah",
    username: "shahsurya",
    password: "suryaShah123",
    profileAvatar:
      "https://res.cloudinary.com/dogvmq3s7/image/upload/v1686487410/samples/people/smiling-man.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Shubham",
    lastName: "Soni",
    username: "shubhamsoni",
    password: "shubhamSoni123",
    profileAvatar:
      "https://res.cloudinary.com/dogvmq3s7/image/upload/v1686487412/samples/people/boy-snow-hoodie.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
