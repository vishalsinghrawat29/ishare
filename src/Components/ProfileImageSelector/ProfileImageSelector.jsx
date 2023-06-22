import { profileImages } from "../../Utils/ProfileImages";
import { MdClose } from "react-icons/md";
import "./ProfileImageSelectorStyle.css";

const ProfileImageSelector = ({
  setAvtaarEdit,
  selectedProfileImage,
  setIsProfileImageSelectorOpen,
  setSelectedProfileImage,
}) => {
  const onSelectProfileImage = (imageUrl) => {
    setSelectedProfileImage(imageUrl);
    setIsProfileImageSelectorOpen(false);
    setAvtaarEdit(false);
  };

  return (
    <div
      className="profile-img-selector-wrapper"
      onClick={(e) => {
        e.stopPropagation();
        setIsProfileImageSelectorOpen(false);
        setAvtaarEdit(false);
      }}
    >
      <div className="profile-img-selector-container">
        <p className="profile-selector-head">
          <span>Choose Avtaar</span>
          <button
            onClick={() => {
              setIsProfileImageSelectorOpen(false);
              setAvtaarEdit(false);
            }}
          >
            <MdClose />
          </button>
        </p>
        <div className="profile-img-wrapper">
          {profileImages.map((imageUrl, index) => (
            <img
              style={{
                border:
                  selectedProfileImage === imageUrl
                    ? "0.25rem solid rgb(246, 55, 134)"
                    : "",
              }}
              className="profile-selector-img"
              key={index}
              src={imageUrl}
              alt={`Profile ${index + 1}`}
              onClick={() => onSelectProfileImage(imageUrl)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export { ProfileImageSelector };
