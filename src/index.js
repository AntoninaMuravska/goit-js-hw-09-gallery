import './sass/main.scss';
import images from './js/gallery-items';

const refs = {
    galleryListRef: document.querySelector('.gallery'),
    lightboxRef: document.querySelector('.js-lightbox'),
    galleryImg: document.querySelector('.lightbox__image'),
    btnClose: document.querySelector('.lightbox__button'),
    leftArrowBtn: document.querySelector('.left-arrow'),
    rightArrowBtn: document.querySelector('.right-arrow'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
  };
  
  const {
    galleryListRef,
    lightboxRef,
    galleryImg,
    btnClose,
    leftArrowBtn,
    rightArrowBtn,
    lightboxOverlay,
  } = refs;
  
  const createGalleryMarkup = images
    .map(({ preview, original, description }, index) => {
      return `<li class = "gallery__item">
    <a class = "gallery__link" href = ${original}>
    <img
    class = "gallery__image"
    src = ${preview}
    data-source="${original}"
    data-index="${(index += 1)}"
    alt = ${description}
    />
    </a>
    </li>`;
    })
    .join('');
  
  galleryListRef.insertAdjacentHTML('beforeend', createGalleryMarkup);
  
  galleryListRef.addEventListener('click', onImgClick);
  
  function onImgClick(e) {
    e.preventDefault();
    const originalImageUrl = e.target.dataset.source;
    // console.log(originalImageUrl);
  
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    // console.log(e.target.nodeName);
  
    openModal();
    imgAttributes(originalImageUrl, e.target.alt, Number(e.target.dataset.index));
  }
  
  function openModal() {
    lightboxRef.classList.add('is-open');
    window.addEventListener('keydown', onPressEscape);
    window.addEventListener('keydown', onPressRightArrow);
    window.addEventListener('keydown', onPressLeftArrow);
  }
  
  function closeModal() {
    lightboxRef.classList.remove('is-open');
    window.removeEventListener('keydown', onPressEscape);
    window.removeEventListener('keydown', onPressRightArrow);
    window.removeEventListener('keydown', onPressLeftArrow);
    galleryImg.src = '';
    galleryImg.alt = '';
  }
  
  function onPressEscape(e) {
    if (e.code === 'Escape') {
      closeModal();
    }
  }
  
  btnClose.addEventListener('click', closeModal);
  leftArrowBtn.addEventListener('click', onLeftArrowClick);
  rightArrowBtn.addEventListener('click', onRightArrowClick);
  
  lightboxOverlay.addEventListener('click', onLightboxEvent);
  
  function onLightboxEvent(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
  
  function onPressRightArrow(e) {
    if (e.key === 'ArrowRight') {
      onSwitchImg(Number(galleryImg.dataset.index), +1);
    }
  }
  
  function onPressLeftArrow(e) {
    if (e.key === 'ArrowLeft') {
      onSwitchImg(Number(galleryImg.dataset.index), -1);
    }
  }
  
  function onLeftArrowClick() {
    onSwitchImg(Number(galleryImg.dataset.index), -1);
  }
  
  function onRightArrowClick() {
    onSwitchImg(Number(galleryImg.dataset.index), +1);
  }
  
  function imgAttributes(src, alt, index) {
    galleryImg.setAttribute('src', src);
    galleryImg.setAttribute('alt', alt);
    galleryImg.setAttribute('data-index', index);
  }
  
  function onSwitchImg(index, step) {
    let newIndex = index + step;
  
    if (newIndex === images.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = images.length - 1;
    }
  
    // console.log(newIndex);
    imgAttributes(
      images[newIndex].original,
      images[newIndex].description,
      newIndex,
    );
  }
  