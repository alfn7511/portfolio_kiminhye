export default class Masthead {
  constructor(el) {
    this.message = "";
    this.messageIndex = 0;
    this.messageWriting = true;
    this.MESSAGE_LIST = ["Hello, World!", "Web Publisher", "Front-End Developer"];

    el.innerHTML = `<div class="container d-flex align-items-center flex-column">
    <!-- Masthead Avatar Image--><img class="masthead-avatar mb-5" src="assets/img/profile.png" alt="" /><!-- Masthead Heading-->
    <h1 class="masthead-heading mb-0">I'm Kim Inhye</h1>
    <!-- Icon Divider-->
    <div class="divider-custom divider-light">
        <div class="divider-custom-line"></div>
        <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
        <div class="divider-custom-line"></div>
    </div>
    <!-- Masthead Subheading-->
    <div class="masthead-subheading mb-0">
      <p id="message" class="font-weight-light"></p>
      <span class="cursor" id="msgcursor"></span>
    </div>
</div>`;
    this.updateMessage(el)
  }
  updateMessage(el) {
    let currentMessage = this.MESSAGE_LIST[this.messageIndex]
      .split("")
      .concat([""]);
    let messageEl = el.querySelector("#message");
    let msgcursorEl = el.querySelector("#msgcursor");
    msgcursorEl.classList.add("idle");

    currentMessage.reduce((p, c, idx) => {
      return p.then(async () => {
        if (currentMessage.length - 1 === idx) {
          await this.delay(300);
          msgcursorEl.classList.remove("idle");
          await this.delay(1900);
          this.removeMessage(el);
          return;
        }
        await this.delay(160);
        this.message += c;
        messageEl.innerHTML = this.message;
      });
    }, Promise.resolve());
  }
  async removeMessage(el) {
    let messageEl = el.querySelector("#message");
    let msgcursorEl = el.querySelector("#msgcursor");
    msgcursorEl.classList.add("idle");
    if (this.message.length) {
      await this.delay(80);
      this.message = this.message.slice(0, this.message.length - 1);
      messageEl.innerHTML = this.message;
      this.removeMessage(el);
    } else {
      if (this.messageIndex + 1 === this.MESSAGE_LIST.length) {
        this.messageIndex = 0;
      } else {
        this.messageIndex = this.messageIndex + 1;
      }
      await this.delay(400);
      this.updateMessage(el);
    }
  }
  delay(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
}
