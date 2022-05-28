import Constants from "../Constants.js";

export default class About {
    constructor() {
        document.title = Constants.siteName;
    }

    async getHtml() {
        return `
            <style>
                body {
                    background-image: url('../images/AboutBackground.jpg');
                    background-repeat: no-repeat;
                    background-attachment: fixed;
                    background-size: 100%;
                }
            </style>
            <img src="../images/AboutBackgroundLogo.png" class="transparentAboutLogo"/>
            <a class="bookNow" href="/accommodation" data-link>Book Now</a>
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