import { toast } from "react-toastify";

const uploadImage = async (image) => {
  try {
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "iShare");
    formData.append("folder", "iShare");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dogvmq3s7/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const jsonRes = await res.json();
    return jsonRes;
  } catch (err) {
    console.log(err);
    toast.error("Image Upload failed.");
  }
};
export { uploadImage };
