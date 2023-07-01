import { MdClose, MdOutlineAddPhotoAlternate } from "react-icons/md";
import "./EditProfileModalStyle.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../index";
import { DataContext } from "../../index";
import { uploadImage } from "../../Utils/UploadImage";
import { updateProfile } from "../../Utils/UserUtils";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { UserBackground } from "../UserBackground/UserBackground";
import { ProfileImageSelector } from "../ProfileImageSelector/ProfileImageSelector";
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
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [isProfileImageSelectorOpen, setIsProfileImageSelectorOpen] =
    useState(false);
  const [avtaarEdit, setAvtaarEdit] = useState(false);
  const [profileUpdateBtnDisbaled, setProfileBtnDisabled] = useState(false);

  const editFormHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setProfileBtnDisabled(true);
    if (profileImage && backgroundImage) {
      const profileImageRes = await uploadImage(profileImage);
      const backgroundImageRes = await uploadImage(backgroundImage);
      updateProfile({
        editInput: {
          ...currentUser,
          ...editInput,
          profileAvatar: profileImageRes.url,
          profileBackground: backgroundImageRes.url,
        },
        token,
        authDispatch,
        dataDispatch,
        users,
        setProfileBtnDisabled,
      });
    } else if (selectedProfileImage && backgroundImage) {
      const backgroundImageRes = await uploadImage(backgroundImage);
      updateProfile({
        editInput: {
          ...currentUser,
          ...editInput,
          profileAvatar: selectedProfileImage,
          profileBackground: backgroundImageRes.url,
        },
        token,
        authDispatch,
        dataDispatch,
        users,
        setProfileBtnDisabled,
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
        setProfileBtnDisabled,
      });
    } else if (profileImage) {
      const res = await uploadImage(profileImage);
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
        setProfileBtnDisabled,
      });
    } else if (selectedProfileImage) {
      updateProfile({
        editInput: {
          ...currentUser,
          ...editInput,
          profileAvatar: selectedProfileImage,
        },
        token,
        authDispatch,
        dataDispatch,
        users,
        setProfileBtnDisabled,
      });
    } else {
      updateProfile({
        editInput: { ...currentUser, ...editInput },
        token,
        authDispatch,
        dataDispatch,
        users,
        setProfileBtnDisabled,
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
      <form
        onSubmit={editFormHandler}
        className="edit-porfile-form"
        onClick={(e) => {
          e.stopPropagation();
          setAvtaarEdit(false);
        }}
      >
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
                  <MdOutlineAddPhotoAlternate className="edit-profile-camera-icon" />
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

          <div
            className="edit-profile-img-container"
            onClick={(e) => {
              e.stopPropagation();
              setAvtaarEdit(false);
            }}
          >
            <div className="edit-profile-user-avtaar">
              <UserAvatar
                user={
                  selectedProfileImage
                    ? {
                        ...currentUser,
                        profileAvatar: selectedProfileImage,
                      }
                    : profileImage
                    ? {
                        ...currentUser,
                        profileAvatar: URL.createObjectURL(profileImage),
                      }
                    : currentUser
                }
              />
              <div
                className="edit-profile-icon-container"
                onClick={(e) => {
                  e.stopPropagation();
                  setAvtaarEdit((prev) => !prev);
                }}
              >
                <MdOutlineAddPhotoAlternate className="edit-profile-camera-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="avtaar-edit-wrapper">
          {avtaarEdit && (
            <div
              className="avtaar-edit-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <label
                htmlFor="edit-profile-img"
                onClick={(e) => e.stopPropagation()}
              >
                Upload Image
              </label>
              <input
                id="edit-profile-img"
                type="file"
                accept="image/*"
                className="edit-profile-image"
                onChange={(e) => {
                  e.stopPropagation();
                  const fileSize = Math.round(
                    e.target.files[0]?.size / 1024000
                  ); // File size in Mb
                  if (fileSize > 1) {
                    alert("File size should not be more than 1Mb");
                  } else {
                    setSelectedProfileImage(null);
                    setProfileImage(e.target.files[0]);
                    setAvtaarEdit(false);
                  }
                }}
              />
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileImageSelectorOpen(true);
                }}
              >
                Select Avtaar
              </span>
            </div>
          )}
        </div>
        {isProfileImageSelectorOpen && (
          <ProfileImageSelector
            setAvtaarEdit={setAvtaarEdit}
            selectedProfileImage={selectedProfileImage}
            setIsProfileImageSelectorOpen={setIsProfileImageSelectorOpen}
            setSelectedProfileImage={setSelectedProfileImage}
            currentUser={currentUser}
          />
        )}

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
        <button
          type="submit"
          onClick={(e) => e.stopPropagation()}
          disabled={profileUpdateBtnDisbaled}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export { EditProfileModal };
