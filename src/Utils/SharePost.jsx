import { toast } from "react-toastify";

const sharePost = (postId) => {
  navigator.clipboard.writeText(
    `https://ishare-vishal.netlify.app/post/${postId}`
  );
  toast.success("Link copied to clipboard");
};
export { sharePost };
