import Constants from "../Constants.js";

export default class Explore {
    constructor() {
        document.title = Constants.siteName + " - " + Constants.exploreTab;
    }

    async getHtml() {
        return `
            <h1>Explore</h1>
            <p>Some stuff to do when you're here</p>
        `;
    }

    setActiveTab() {
        const selector = '.nav__link';
        const elements = Array.from(document.querySelectorAll(selector));
            
        elements.forEach(x => x.classList.remove('active'));
        const element = elements.find(x => x.outerHTML.endsWith(Constants.exploreTab + "</a>"));
        element.classList.add('active')
    }
}