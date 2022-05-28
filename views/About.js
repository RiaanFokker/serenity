import Constants from "../Constants.js";

export default class About {
    constructor() {
        document.title = Constants.siteName;
    }

    async getHtml() {
        return `
            <h1>Serenity @ 14 Keurbooms River Lodge</h1>
            <p>
                <a href="/accommodation" data-link>Click here to book your stay</a>
            </p>
        `;
    }

    setActiveTab() {
        const selector = '.nav__link';
        const elements = Array.from(document.querySelectorAll(selector));
            
        elements.forEach(x => x.classList.remove('active'));
        const element = elements.find(x => x.outerHTML.endsWith(Constants.aboutTab + "</a>"));
        element.classList.add('active')
    }
}