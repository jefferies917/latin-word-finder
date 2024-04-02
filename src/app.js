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
const fs = __importStar(require("fs")); // Import the Node.js file system module for file operations
class TaskWordFinder {
    constructor(dictionaryFileName) {
        // Constructor function to initialize the TaskWordFinder object
        const dictionaryList = this.loadDictionaryFromFile(dictionaryFileName); // Load dictionary from file
        this.dictionarySet = new Set(dictionaryList); // Store words in a Set for efficient lookup
        this.longestWord = undefined; // Initialize longest word as undefined
    }
    // Method to load dictionary from file and return an array of words
    loadDictionaryFromFile(fileName) {
        try {
            const data = fs.readFileSync(fileName, 'utf8'); // Read dictionary file synchronously
            return data.split('\n').map(word => word.trim()); // Split words by newline and trim whitespace
        }
        catch (error) {
            console.error(`Error reading dictionary file: ${fileName}`); // Log error if file reading fails
            throw error; // Throw the error for handling by caller
        }
    }
    // Method to check if a word can be formed using available letters
    isValidWord(word, availableLetters) {
        const availableLetterSet = new Set(availableLetters);
        const wordLetterSet = new Set(word);
        // Check if every letter in the word is present in the available letters
        return [...wordLetterSet].every(letter => availableLetterSet.has(letter));
    }
    longestWordFinder(s) {
        const sortedWords = Array.from(this.dictionarySet).sort((a, b) => b.length - a.length); // Sort words by length in descending order
        console.log("Available Letters:", s);
        for (const word of sortedWords) {
            const wordLetters = word.split('');
            const availableLetters = s.split('');
            let isValid = true;
            for (const letter of wordLetters) {
                const letterIndex = availableLetters.indexOf(letter);
                if (letterIndex === -1) {
                    isValid = false;
                    break;
                }
                availableLetters.splice(letterIndex, 1);
            }
            if (isValid) {
                this.longestWord = word; // Update longestWord
                return word; // Return the longest word found
            }
        }
        this.longestWord = undefined; // If no valid word found, set longestWord as undefined
        return undefined; // Return undefined
    }
    // Method to get the longest word found
    getLongestWord() {
        return this.longestWord; // Return the longest word found
    }
}
const dictionaryFileName = 'dictionary.txt'; // Name of the dictionary file
const taskWordFinder = new TaskWordFinder(dictionaryFileName); // Create a new TaskWordFinder object
// Extract input letters from command line arguments
const inputWord = process.argv[2] ? process.argv[2].toLowerCase() : ''; // Input letters to find the longest word
if (!inputWord) {
    console.error('Please provide letters as command line argument.');
    process.exit(1); // Exit with error status
}
const result = taskWordFinder.longestWordFinder(inputWord); // Find the longest word
console.log(`The longest word that can be made from '${inputWord}' is: ${result}`); // Log the result
