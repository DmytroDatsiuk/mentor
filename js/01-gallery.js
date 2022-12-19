import { galleryItems } from './gallery-items.js';

const refs = getRefs();

refs.gallery.addEventListener('click', onGalleryImgClick);
refs.closeModalButton.addEventListener('click', onCloseModalButtonClick);
refs.backdrop.addEventListener('click', onModalBackdropClick);

const imageItem = galleryItems
    .map(
        ({ preview, original, description }) =>
            `
        <div class='gallery__item'>
        <a class='gallery__link' href='${original}'>
        <img class='gallery__image' src='${preview}' data-source='${original}' alt='${description}'/>
        </a>
        </div>
        `
    )
    .join('');

refs.gallery.insertAdjacentHTML('beforeend', imageItem);

function onGalleryImgClick(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== 'IMG') {
        return;
    }

    openModal(evt.target.dataset.source);
    // console.dir()
}

function onCloseModalButtonClick(evt) {
    closeModal();
}

function onModalBackdropClick(evt) {
    // console.log('target: ', evt.target);
    // console.log('currentTarget: ', evt.currentTarget);
    if (evt.target === evt.currentTarget) {
        closeModal();
    }
}

function openModal(src) {
    refs.backdrop.classList.remove('is-hidden');
    refs.modal.insertAdjacentHTML(
        'beforeend',
        `<img alt='' src='${src}' class='modal-img'/>`
    );

    document.addEventListener('keydown', onEscapeButtonPress);
    // console.log(ref)
    // console.log(refs.modalImg)
}

function closeModal() {
    refs.backdrop.classList.add('is-hidden');
    document.removeEventListener('keydown', onEscapeButtonPress);

    const ref = document.querySelector('.modal-img');
    ref.remove();
}

function getRefs() {
    return {
        gallery: document.querySelector('.gallery'),
        backdrop: document.querySelector('.backdrop'),
        closeModalButton: document.querySelector('.close-modal'),
        modal: document.querySelector('.modal'),
        modalImg: document.querySelector('.modal-img'),
    };
}

function onEscapeButtonPress(evt) {
    if (evt.code !== 'Escape') {
        return;
    }
    closeModal();
}
