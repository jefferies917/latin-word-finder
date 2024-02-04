"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class TaskWordFinder {
    constructor(dictionaryFileName) {
        const dictionaryList = this.loadDictionaryFromFile(dictionaryFileName);
        this.dictionarySet = new Set(dictionaryList);
        this.longestWord = undefined;
    }
    loadDictionaryFromFile(fileName) {
        try {
            const data = fs.readFileSync(fileName, 'utf8');
            return data.split('\n').map(word => word.trim());
        }
        catch (error) {
            console.error(`Error reading dictionary file: ${fileName}`);
            throw error;
        }
    }
    isValidWord(word, availableLetters) {
        // Check if the word can be formed using available letters
        return [...word].every(letter => availableLetters.includes(letter));
    }
    longestWordFinder(s) {
        // Sort the dictionary words by length in descending order
        const sortedWords = Array.from(this.dictionarySet).sort((a, b) => b.length - a.length);
        // Iterate through sorted words and set the longestWord property with the first valid word
        for (const word of sortedWords) {
            if (word.length <= s.length && this.isValidWord(word, s)) {
                this.longestWord = word;
                return word;
            }
        }
        // If no valid word is found, set longestWord to undefined
        this.longestWord = undefined;
        return undefined;
    }
    getLongestWord() {
        return this.longestWord;
    }
}
// Example usage:
const dictionaryFileName = 'dictionary.txt';
const taskWordFinder = new TaskWordFinder(dictionaryFileName);
const inputWord = 'acrdts';
const result = taskWordFinder.longestWordFinder(inputWord);
console.log(`The longest word that can be built from '${inputWord}' is: ${result}`);
console.log(`Longest word found using the letters of '${inputWord}': ${taskWordFinder.getLongestWord()}`);
