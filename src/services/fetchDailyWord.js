import { WORDS } from "./words";

const getData = () => {
    return WORDS;
}

export const getDailyWord = () => {
    const words = getData()
    const word = words[Math.floor(Math.random() * words.length - 1)]
    return word
}

export const isValid = async (word) => {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    try {
        const request = await fetch(URL)
        if (request.status !== 200) throw new Error("Request Failed");
        const data = await request.json()
        return data
    } catch (error) {
        console.log(error)
        return false
    }
}

// export const wordOfTheDayDefinition = async(wordOfTheDay) => {
//     const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordOfTheDay}`
//     try {
//         const request = await fetch(URL)
//         const data = await request.json()
//         if (request.status !== 200) throw new Error("Request Failed");
//         return data
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }