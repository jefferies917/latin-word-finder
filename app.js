"use strict";
class WordFinder {
    constructor(dictionaryList) {
        this.dictionarySet = new Set(dictionaryList);
    }
    isValidWord(word, availableLetters) {
        // Check if the word can be formed using available letters
        return [...word].every(letter => availableLetters.includes(letter));
    }
    longestWord(s) {
        // Sort the dictionary words by length in descending order
        const sortedWords = Array.from(this.dictionarySet).sort((a, b) => b.length - a.length);
        // Iterate through sorted words and return the first valid word
        for (const word of sortedWords) {
            if (word.length <= s.length && this.isValidWord(word, s)) {
                return word;
            }
        }
        return undefined;
    }
}
// Example usage:
// Create a WordFinder instance with a list of words
const dictionaryList = ["cat", "dog", "rat", "art", "car", "cards"];
const wordFinder = new WordFinder(dictionaryList);
// Find the longest word that can be formed from the given letters
const inputWord = "acrdts";
const result = wordFinder.longestWord(inputWord);
console.log(`The longest word that can be built from '${inputWord}' is: ${result}`);
