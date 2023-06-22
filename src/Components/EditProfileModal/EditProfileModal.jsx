import { MdClose } from "react-icons/md";
import { BsCamera } from "react-icons/bs";
import "./EditProfileModalStyle.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../index";
import { DataContext } from "../../index";
import { uploadImage } from "../../Utils/UploadImage";
import { updateProfile } from "../../Utils/UserUtils";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { UserBackground } from "../UserBackground/UserBackground";
const EditProfileModal = ({ setEditModal }) => {
  const {
    authState: { user, token },
    authDispatch,
  } = useContext(AuthContext);

  const {
    dataState: { users },
    dataDispatch,
  } = useContext(DataContext);

  const currentUser = users?.find(
    (dbUser) => dbUser.username === user.username
  );

  const [editInput, setEditInput] = useState(currentUser);
  const [image, setImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const editFormHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (image && backgroundImage) {
      const imageRes = await uploadImage(image);
      const backgroundImageRes = await uploadImage(backgroundImage);
      updateProfile({
        editInput: {
          ...currentUser,
          ...editInput,
          profileAvatar: imageRes.url,
          profileBackground: backgroundImageRes.url,
        },
        token,
        authDispatch,
        dataDispatch,
        users,
      });
    } else if (backgroundImage) {
      const res = await uploadImage(backgroundImage);
      updateProfile({
        editInput: {
          ...currentUser,
          ...editInput,
          profileBackground: res.url,
        },
        token,
        authDispatch,
        dataDispatch,
        users,
      });
    } else if (image) {
      const res = await uploadImage(image);
      updateProfile({
        editInput: {
          ...currentUser,
          ...editInput,
          profileAvatar: res.url,
        },
        token,
        authDispatch,
        dataDispatch,
        users,
      });
    } else {
      updateProfile({
        editInput: { ...currentUser, ...editInput },
        token,
        authDispatch,
        dataDispatch,
        users,
      });
    }
    setEditModal(false);
  };

  const editChangeHandler = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setEditInput(() => ({ ...editInput, [name]: value }));
  };

  return (
    <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
      <div className="edit-profile-head">
        <h1>Edit Profile</h1>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditModal(false);
          }}
        >
          <MdClose />
        </button>
      </div>
      <form onSubmit={editFormHandler} className="edit-porfile-form">
        <div className="edit-images-coantiner">
          <div className="edit-profile-background-container">
            <label htmlFor="edit-profile-background">
              <div className="edit-profile-user-background">
                <UserBackground
                  user={
                    backgroundImage
                      ? {
                          ...currentUser,
                          profileBackground:
                            URL.createObjectURL(backgroundImage),
                        }
                      : currentUser
                  }
                />
                <div className="edit-profile-icon-container">
                  <BsCamera className="edit-profile-camera-icon" />
                </div>
              </div>
            </label>
            <input
              id="edit-profile-background"
              type="file"
              accept="image/*"
              className="edit-profile-background"
              onChange={(e) => {
                Math.round(e.target.files[0]?.size / 1024000) > 1
                  ? alert("File size should not be more than 1Mb")
                  : setBackgroundImage(e.target.files[0]);
              }}
            />
          </div>

          <div className="edit-profile-img-container">
            <label htmlFor="edit-profile-img">
              <div className="edit-profile-user-avtaar">
                <UserAvatar
                  user={
                    image
                      ? {
                          ...currentUser,
                          profileAvatar: URL.createObjectURL(image),
                        }
                      : currentUser
                  }
                />
                <div className="edit-profile-icon-container">
                  <BsCamera className="edit-profile-camera-icon" />
                </div>
              </div>
            </label>
            <input
              id="edit-profile-img"
              type="file"
              accept="image/*"
              className="edit-profile-image"
              onChange={(e) => {
                Math.round(e.target.files[0]?.size / 1024000) > 1
                  ? alert("File size should not be more than 1Mb")
                  : setImage(e.target.files[0]);
              }}
            />
          </div>
        </div>

        <div className="edit-profile-field">
          <label htmlFor="edit-profile-firstname">First Name</label>
          <input
            type="text"
            name="firstName"
            value={editInput.firstName}
            onChange={editChangeHandler}
            required
          />
        </div>
        <div className="edit-profile-field">
          <label htmlFor="edit-profile-lastname">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={editInput.lastName}
            onChange={editChangeHandler}
            required
          />
        </div>
        <div className="edit-profile-field">
          <label htmlFor="edit-profile-bio">Bio</label>
          <input
            type="text"
            name="bio"
            value={editInput.bio}
            onChange={editChangeHandler}
          />
        </div>
        <div className="edit-profile-field">
          <label htmlFor="edit-profile-website">Website</label>
          <input
            type="text"
            name="website"
            value={editInput.website}
            onChange={editChangeHandler}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export { EditProfileModal };
