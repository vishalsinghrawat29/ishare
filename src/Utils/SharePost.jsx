import { toast } from "react-toastify";

const sharePost = (postId) => {
  navigator.clipboard.writeText(`http://localhost:3000/post/${postId}`);
  toast.success("Link copied to clipboard");
};
export { sharePost };
