import { Developer } from "../modules/Models/Developer";
import { getElementIterate, getGeneralInformation, getIdiomField, getInformationDeveloper } from "../utils";
import { getUrlDevelopers } from "./getUrls";



// Informacion general del developer

// const information = getGeneralInformation();
// console.log(information)

const test = getUrlDevelopers();
console.log(test)


// Informacion del perfil del Developer
const getSecondaryInformation = () => {
    return getElementIterate(
        '(.//*/div[2]/div[2]/div[1]/div[2])[2]',
        document
    ).iterateNext();
}

// const fullname = document.querySelector('body > main > h1')?.textContent;
// const secondaryInformation = getSecondaryInformation()?.textContent;
// const education = getInformationDeveloper('Educación');
// const experience = getInformationDeveloper('Experiencia');
// const idioms = getIdiomField();

// console.log(fullname)
// console.log(secondaryInformation)
// console.log(experience)
// console.log(education)
// console.log(idioms)

// let port = chrome.runtime.connect({name: 'safePort'});
// port.postMessage(new Developer(fullname, secondaryInformation, experience, education, idioms));








// const getSecondaryInformation = () => {
//     return document.evaluate(
//         '(.//*/div[2]/div[2]/div[1]/div[2])[2]',
//         document,
//         null,
//         XPathResult.ANY_TYPE,
//         null
//     ).iterateNext(); // con XPathResult.iterateNext() se usa while y con XPathResult.snapshotItem() se usa for
// }