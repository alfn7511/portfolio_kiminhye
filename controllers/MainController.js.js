import Masthead from "../views/Masthead.js";
export default class MainController {
  constructor() {
    const mastheadEl = document.querySelector("#masthead");
    this.mastheadElView = new Masthead(mastheadEl);
  }
}
