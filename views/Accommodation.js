import Constants from "../Constants.js";

export default class Accommodation {
    constructor() {
        document.title = Constants.siteName + " - " + Constants.accommodationTab;
    }

    async getHtml() {
        return `
            <h1>Accommodation</h1>
            <p>Booking link and picture gallery</p>
        `;
    }

    setActiveTab() {
        const selector = '.nav__link';
        const elements = Array.from(document.querySelectorAll(selector));
            
        elements.forEach(x => x.classList.remove('active'));
        const element = elements.find(x => x.outerHTML.endsWith(Constants.accommodationTab + "</a>"));
        element.classList.add('active')
    }
}