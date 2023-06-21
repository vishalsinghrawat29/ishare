import { MdClose } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import "./EditProfileModalStyle.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../index";
import { DataContext } from "../../index";
import { uploadImage } from "../../Utils/UploadImage";
import { updateProfile } from "../../Utils/UserUtils";
import { UserAvatar } from "../UserAvatar/UserAvatar";
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

  const editFormHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (image) {
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
        <div>
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
              <FaCamera className="edit-profile-camera-icon" />
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
