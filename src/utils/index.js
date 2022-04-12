import { Education } from "../modules/Models/Education";
import { Experience } from "../modules/Models/Experience";
import { Idiom } from "../modules/Models/Idioms";

export const getElementIterate = (expresion, contextNode) => {
    return document.evaluate(expresion, contextNode, null, XPathResult.ANY_TYPE, null)
}

// Informacion general de developer

export const getUlDevelopers = () => {
    return getElementIterate('(.//*/div/div/div[1]/ul)[1]', document).iterateNext();
}

export const getGeneralInformation = () => {
    const nodeUlDevelopers = getUlDevelopers();

    let listItemDevelopers = getElementIterate("./li", nodeUlDevelopers);
    let developersIterate = listItemDevelopers.iterateNext();

    const developerListItems = [];

    while(developersIterate) {
        const urlDeveloper = getElementIterate("./div/div/div[2]/div[1]/div[1]/div/span[1]/span/a", developersIterate);

        let urlIterator = urlDeveloper.iterateNext();

        const developerArray = [];
        while (urlIterator) {
            developerArray.push(urlIterator.href);
            urlIterator = urlDeveloper.iterateNext();
        }

        developerListItems.push(developerArray[0])
        developersIterate = listItemDevelopers.iterateNext();
    }

    return developerListItems;
}

// Informacion del developer en su perfil
export const getUlByText = text => {
    
    return getElementIterate(
        `(//section[.//span[contains(text(), "${text}")] or .//div[contains(text(), "${text}")]]//ul)[1]`,
        document
    ).iterateNext();
}


// solo para experiencia y educación, con otro campo se obtiene un error;
export const getInformationDeveloper = (characteristic) => {

    const nodeUlCharacteristic = getUlByText(characteristic);
    let listItemCharacteristic = getElementIterate('./li', nodeUlCharacteristic);
    let characteristicIterate = listItemCharacteristic.iterateNext();

    const characteristicListItems = [];

    while (characteristicIterate) {

        const spansCharacteristic = getElementIterate('.//span[@aria-hidden]', characteristicIterate);
        let spansCharacteristicIterator = spansCharacteristic.iterateNext();

        const characteristicArray = [];

        while (spansCharacteristicIterator) {
            characteristicArray.push(spansCharacteristicIterator.textContent);
            spansCharacteristicIterator = spansCharacteristic.iterateNext();
        }
        if(characteristic==='Educación') {
            characteristicListItems.push(new Education(characteristicArray[0], characteristicArray[1], characteristicArray[2]))
            characteristicIterate = listItemCharacteristic.iterateNext();
        } else if (characteristic==='Experiencia') {
            characteristicListItems.push(new Experience(characteristicArray[0], characteristicArray[1], characteristicArray[2], characteristicArray[3]))
            characteristicIterate = listItemCharacteristic.iterateNext();
        } else {
            return 'Unknow module';
        }
    }

    return characteristicListItems;
}

export const getIdiomField = () => {
    const validateField = getElementIterate(
        '(//section[.//span[contains(text(), "Idiomas")] or .//div[contains(text(), "Idiomas")]]//ul)[1]',
        document
    ).iterateNext();

    if(validateField) {

        let listItemsIdioms = document.evaluate('./li', validateField, null, XPathResult.ANY_TYPE, null);

        let idiomsIterate = listItemsIdioms.iterateNext();
        const idiomsListItems = [];

        while (idiomsIterate) {
            const spansIdioms = document.evaluate('.//span[@aria-hidden]', idiomsIterate, null, XPathResult.ANY_TYPE, null)
            let spansIdiomsIterator = spansIdioms.iterateNext();
            const idiomsArray = [];

            while (spansIdiomsIterator) {
                idiomsArray.push(spansIdiomsIterator.textContent);
                spansIdiomsIterator = spansIdioms.iterateNext();
            }

            idiomsListItems.push(new Idiom(idiomsArray[0], idiomsArray[1]));
            idiomsIterate = listItemsIdioms.iterateNext();
        }

        return idiomsListItems;
    } else {
        return [new Idiom('not found', 'not found')]
    }
}