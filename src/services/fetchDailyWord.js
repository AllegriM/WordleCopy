import { WORDS } from "./words";

// const API_ID = "a3888e9f"
// const API_KEY = "a05d306d69a9511b6a0f6edcce934f4d"

// const URL = "https://od-api.oxforddictionaries.com/api/v2/words/es?q=nadar"
const getData = () => {
    return WORDS;
}

export const getDailyWord = () => {
    const words = getData()
    const word = words[Math.floor(Math.random() * words.length - 1)]
    return word
}

// export const isValid = async (word) => {
//     const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
//     try {
//         const request = await fetch(URL)
//         if (request.status !== 200) throw new Error("Request Failed");
//         const data = await request.json()
//         return data
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }
