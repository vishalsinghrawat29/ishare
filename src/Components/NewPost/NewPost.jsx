import React, { useContext, useEffect, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { AuthContext } from "../../index";
import { DataContext } from "../../index";
import { uploadImage } from "../../Utils/UploadImage";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import "./NewPostStyle.css";
import { createPost } from "../../Utils/PostUtils";
import { MdClose, MdOutlineAddReaction } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
const NewPost = () => {
  const {
    authState: { user, token },
  } = useContext(AuthContext);

  const {
    dataState: { users, posts, bookmarks },
    dataDispatch,
  } = useContext(DataContext);

  const currentUser = users?.find(
    (dbUser) => dbUser.username === user?.username
  );

  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postBtnDisbaled, setPostBtnDisbaled] = useState(false);

  const submitPost = async (e) => {
    e.preventDefault();
    setPostBtnDisbaled(true);
    if (image) {
      const res = await uploadImage(image);
      createPost({
        input,
        image: res.url,
        imageAlt: res.original_filename,
        token,
        user,
        dataDispatch,
        setPostBtnDisbaled,
      });
    } else {
      createPost({
        input,
        image: "",
        imageAlt: "",
        token,
        user,
        dataDispatch,
        setPostBtnDisbaled,
      });
    }
    setInput("");
    setShowEmojiPicker(false);
    setImage(null);
    handleFileInputReset();
  };

  const setImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const setInputHandler = (e) => {
    const inputValue = e.target.value.slice(0, 256);
    setInput(inputValue);
  };

  const setEmojiHandler = (emojiObj) => {
    const emoji = emojiObj.emoji;
    const updatedContent = input + emoji;
    setInput(updatedContent);
    setShowEmojiPicker(false);
  };

  const resetImage = () => {
    setImage(null);
    handleFileInputReset();
  };

  const handleFileInputReset = () => {
    const fileInput = document.getElementById("new-post-img");
    if (fileInput) {
      fileInput.value = null;
    }
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    console.log("posts", posts);
    console.log("bookmarks", bookmarks);
  }, [posts, bookmarks]);

  return (
    <div className="new-post-container" onClick={(e) => e.stopPropagation()}>
      <UserAvatar user={currentUser} />

      <form onSubmit={submitPost} className="new-post-form">
        <textarea
          placeholder="What's happening?"
          id="new-post-textarea"
          value={input}
          onChange={(e) => setInputHandler(e)}
        />

        {image && (
          <div className="new-post-img-display">
            <img src={URL.createObjectURL(image)} alt="post-img" />
            <button onClick={resetImage} className="center">
              <MdClose className="icon" />
            </button>
          </div>
        )}

        <div className="new-post-btn-container">
          <label htmlFor="new-post-img" className="new-post-img-label">
            <RiImageAddFill className="image-upload-icon" />
          </label>

          <input
            id="new-post-img"
            type="file"
            accept="image/*"
            className="new-post-img-input"
            onChange={(e) =>
              Math.round(e.target.files[0].size / 1024000) > 1
                ? alert("File size should not be more than 1Mb")
                : setImageHandler(e)
            }
          />

          <label
            htmlFor="new-post-emoji"
            className="new-post-img-label"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <MdOutlineAddReaction className="image-upload-icon" />
          </label>
          <div className="emoji-picker-wrapper">
            {showEmojiPicker && (
              <div className="emoji-picker-container">
                <EmojiPicker
                  onEmojiClick={setEmojiHandler}
                  height={380}
                  width={280}
                />
              </div>
            )}
          </div>

          <button
            className="new-post-submit-btn"
            type="submit"
            disabled={(input === "" && image === null) || postBtnDisbaled}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export { NewPost };
