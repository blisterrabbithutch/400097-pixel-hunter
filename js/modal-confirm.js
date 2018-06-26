import Application from './application.js';
import AbstractView from './abstract-view.js';

export default class ModalConfirm extends AbstractView {
  constructor() {
    super();
  }

  template() {
    return `
      <section class="modal-confirm modal-confirm__wrap">
        <form class="modal-confirm__inner">
          <button class="modal-confirm__close" type="button">Закрыть</button>
          <h2 class="modal-confirm__title">Подтверждение</h2>
          <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal-confirm__btn-wrap">
            <button class="modal-confirm__btn">Ок</button>
            <button class="modal-confirm__btn">Отмена</button>
          </div>
        </form>
      </section>
    `;
  }

  showModal() {
    this.element.style.display = `flex`;
  }

  hideModal() {
    this.element.style.display = `none`;
  }

  bind() {
    this.modalClose = this.element.querySelector(`.modal-confirm__close`);
    this.modalConfirm = this.element.querySelector(`.modal-confirm__btn:first-child`);
    this.modalCancel = this.element.querySelector(`.modal-confirm__btn:last-child`);
    this.modalClose.addEventListener(`click`, () => {
      this.hideModal();
    });
    this.modalCancel.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.hideModal();
    });
    this.modalConfirm.addEventListener(`click`, () => {
      Application.showGreeting();
    });
  }
}
