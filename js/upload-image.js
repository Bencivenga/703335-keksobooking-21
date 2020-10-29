'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEFAULT_AVATAR_IMAGE = `img/muffin-grey.svg`;
const ALT_TEXT = `Фотография жилья`;

const stylesToPreview = {
  images: {
    default: {
      width: `40px`,
      height: `44px`,
      borderRadius: `0`,
      marginLeft: `0`,
    },
    edited: {
      width: `70px`,
      height: `70px`,
      borderRadius: `5px`,
      marginLeft: `-15px`,
    },
  }
};

const {adForm} = window.validation;

const avatarImageInput = adForm.querySelector(`#avatar`);
const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
const housingImagesInput = adForm.querySelector(`#images`);
const housingPhotoContainer = adForm.querySelector(`.ad-form__photo-container`);
const housingPhotoBlock = housingPhotoContainer.querySelector(`.ad-form__photo`);


const chooseFile = (file, upload) => {
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => fileName.endsWith(ending));

  if (matches) {
    upload(file);
  }
};

const setStyles = (element, styles) => {
  element.setAttribute(`width`, styles.width);
  element.setAttribute(`height`, styles.height);

  element.style.width = styles.width;
  element.style.height = styles.height;
  element.style.borderRadius = styles.borderRadius;
  element.style.objectFit = `cover`;
};

const uploadAvatar = (file) => {
  const editedStyles = stylesToPreview.images.edited;

  const onAvatarUpload = () => {
    URL.revokeObjectURL(avatarPreview.src);
    avatarPreview.removeEventListener(`load`, onAvatarUpload);
  };

  avatarPreview.addEventListener(`load`, onAvatarUpload);
  avatarPreview.src = URL.createObjectURL(file);

  setStyles(avatarPreview, editedStyles);
  avatarPreview.style.marginLeft = editedStyles.marginLeft;
};

const uploadHousingImage = (fileName) => {
  const divElement = document.createElement(`div`);
  divElement.classList.add(`ad-form__photo`);
  housingPhotoContainer.appendChild(divElement);
  const imageElement = document.createElement(`img`);
  const editedStyles = stylesToPreview.images.edited;

  const onHousingImageUpload = () => {
    URL.revokeObjectURL(imageElement.src);
    imageElement.removeEventListener(`load`, onHousingImageUpload);
  };

  imageElement.addEventListener(`load`, onHousingImageUpload);
  imageElement.src = URL.createObjectURL(fileName);

  setStyles(imageElement, editedStyles);
  imageElement.setAttribute(`alt`, ALT_TEXT);

  housingPhotoBlock.remove();
  divElement.appendChild(imageElement);
};

const onAvatarChange = () => {
  chooseFile(avatarImageInput.files[0], uploadAvatar);
};

const onHousingImageChange = () => {
  chooseFile(housingImagesInput.files[0], uploadHousingImage);
};

const setEnabled = () => {
  avatarImageInput.addEventListener(`change`, onAvatarChange);
  housingImagesInput.addEventListener(`change`, onHousingImageChange);
};

const setDisabled = () => {
  const defaultStyles = stylesToPreview.images.default;

  avatarPreview.style.width = defaultStyles.width;
  avatarPreview.style.height = defaultStyles.height;
  avatarPreview.style.borderRadius = defaultStyles.borderRadius;
  avatarPreview.style.marginLeft = defaultStyles.marginLeft;
  avatarPreview.src = DEFAULT_AVATAR_IMAGE;

  const photoContainers = adForm.querySelectorAll(`.ad-form__photo`);
  photoContainers.forEach((container) => {
    container.remove();
  });

  housingPhotoContainer.appendChild(housingPhotoBlock);

  avatarImageInput.removeEventListener(`change`, onAvatarChange);
  housingImagesInput.removeEventListener(`change`, onHousingImageChange);
};

window.uploadImage = {
  setDisabled,
  setEnabled,
};

