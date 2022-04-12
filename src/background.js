import { db } from "./services/connection";

chrome.commands.onCommand.addListener((command) => {
    chrome.runtime.reload();
  })

chrome.action.onClicked.addListener( async tab => {
    await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ["scripts/scrapper.js"]
    })
})

chrome.runtime.onConnect.addListener(port => {
    if(port.name === "safePort") {
        port.onMessage.addListener( async message => {
            await db.developer.add(message)
            console.log(message)
        })
    }
})