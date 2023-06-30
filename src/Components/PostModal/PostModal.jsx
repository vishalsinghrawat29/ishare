import React, { useContext, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { AuthContext } from "../../index";
import { DataContext } from "../../index";
import { uploadImage } from "../../Utils/UploadImage";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { createPost, editPost } from "../../Utils/PostUtils";
import EmojiPicker from "emoji-picker-react";
import { MdOutlineAddReaction, MdClose } from "react-icons/md";

import "./PostModalStyle.css";

const PostModal = ({ post, setShowNewPostModal, handleShowOptions }) => {
  const {
    authState: { user, token },
  } = useContext(AuthContext);

  const {
    dataState: { users },
    dataDispatch,
  } = useContext(DataContext);

  const currentUser = users?.find(
    (dbUser) => dbUser.username === user?.username
  );

  const [input, setInput] = useState(post || {});
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postBtnDisbaled, setPostBtnDisbaled] = useState(false);

  const submitPost = async (e) => {
    e.preventDefault();
    if (post) {
      console.log("updating... post");
      setPostBtnDisbaled(true);
      if (image) {
        const res = await uploadImage(image);
        editPost({
          input: input?.content,
          image: res.url,
          imageAlt: res.original_filename,
          token,
          post,
          dataDispatch,
          setPostBtnDisbaled,
        });
      } else {
        editPost({
          input: input?.content,
          image: input?.image,
          imageAlt: input?.imageAlt,
          token,
          post,
          dataDispatch,
          setPostBtnDisbaled,
        });
      }
      handleShowOptions(post?._id);
    } else {
      console.log("adding post...");
      setPostBtnDisbaled(true);
      if (image) {
        const res = await uploadImage(image);
        createPost({
          input: input?.content,
          image: res.url,
          imageAlt: res.original_filename,
          token,
          user,
          dataDispatch,
          setPostBtnDisbaled,
        });
      } else {
        createPost({
          input: input?.content,
          image: "",
          imageAlt: "",
          token,
          user,
          dataDispatch,
          setPostBtnDisbaled,
        });
      }
    }

    setInput("");
    setShowEmojiPicker(false);
    setImage(null);
    handleFileInputReset();
    setShowNewPostModal(false);
  };

  const setImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const setInputHandler = (e) => {
    const inputValue = e.target.value.slice(0, 256);
    setInput((prev) => ({
      ...prev,
      content: inputValue,
    }));
  };

  const setEmojiHandler = (emojiObj) => {
    const emoji = emojiObj.emoji;
    const updatedContent = input?.content ? input?.content + emoji : emoji;
    setInput((prev) => ({
      ...prev,
      content: updatedContent,
    }));
    setShowEmojiPicker(false);
  };

  const resetImage = () => {
    input?.image
      ? setInput((prev) => ({ ...prev, image: null }))
      : setImage(null);
    handleFileInputReset();
  };

  const handleFileInputReset = () => {
    const fileInput = document.getElementById("post-modal-img");
    if (fileInput) {
      fileInput.value = null;
    }
    setShowEmojiPicker(false);
  };

  return (
    <div className="post-modal-container" onClick={(e) => e.stopPropagation()}>
      <UserAvatar user={currentUser} />

      <form onSubmit={submitPost} className="post-modal-form">
        <textarea
          placeholder="What's happening?"
          id="post-modal-textarea"
          value={input?.content}
          onChange={(e) => setInputHandler(e)}
        />

        {input?.image || image ? (
          <div className="post-modal-img-display">
            <img
              src={image ? URL.createObjectURL(image) : input?.image}
              alt="post-modal-img"
            />
            <button
              className="center"
              onClick={(e) => {
                e.stopPropagation();
                resetImage();
              }}
            >
              <MdClose className="icon" />
            </button>
          </div>
        ) : null}

        <div className="post-modal-btn-container">
          <label htmlFor="post-modal-img" className="post-modal-img-label">
            <RiImageAddFill className="post-modal-image-upload-icon" />
          </label>

          <input
            id="post-modal-img"
            type="file"
            accept="image/*"
            className="post-modal-img-input"
            onChange={(e) => {
              if (Math.round(e.target.files[0].size / 1024000) > 1) {
                alert("File size should not be more than 1Mb");
              } else {
                setImageHandler(e);
              }
            }}
          />

          <label
            htmlFor="post-modal-emoji"
            className="post-img-label"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <MdOutlineAddReaction className="post-modal-image-upload-icon " />
          </label>
          <div className="emoji-picker-wrapper">
            {showEmojiPicker && (
              <div className="emoji-picker-container">
                <EmojiPicker
                  onEmojiClick={setEmojiHandler}
                  width={300}
                  height={400}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowNewPostModal(false);
              post && handleShowOptions(post?._id);
            }}
          >
            Cancel
          </button>

          <button
            className="post-modal-submit-btn"
            type="submit"
            disabled={(!input?.content?.trim() && !image) || postBtnDisbaled}
          >
            {post ? "Save" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export { PostModal };
