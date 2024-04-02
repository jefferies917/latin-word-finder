"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs"); // Import the Node.js file system module for file operations
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
        return [...word].every(letter => availableLetters.includes(letter)); // Check if every letter of word is in availableLetters
    }
    // Method to find the longest word that can be formed using given letters
    longestWordFinder(s) {
        const sortedWords = Array.from(this.dictionarySet).sort((a, b) => b.length - a.length); // Sort words by length in descending order
        for (const word of sortedWords) {
            if (word.length <= s.length && this.isValidWord(word, s)) {
                // If word length is less than or equal to available letters and word is valid
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