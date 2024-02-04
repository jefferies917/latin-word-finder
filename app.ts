import * as fs from 'fs';

class TaskWordFinder {
    private dictionarySet: Set<string>;

    constructor(dictionaryFileName: string) {
        const dictionaryList = this.loadDictionaryFromFile(dictionaryFileName);
        this.dictionarySet = new Set(dictionaryList);
    }

    private loadDictionaryFromFile(fileName: string): string[] {
        try {
            const data = fs.readFileSync(fileName, 'utf8');
            return data.split('\n').map((word: string) => word.trim());
        } catch (error) {
            console.error(`Error reading dictionary file: ${fileName}`);
            throw error;
        }
    }

    private isValidWord(word: string, availableLetters: string): boolean {
        // Check if the word can be formed using available letters
        return [...word].every(letter => availableLetters.includes(letter));
    }

    longestWordFinder(s: string): string | undefined {
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
const dictionaryFileName: string = 'dictionary.txt';
const taskWordFinder = new TaskWordFinder(dictionaryFileName);

const inputWord: string = 'acrdts';
const result: string | undefined = taskWordFinder.longestWordFinder(inputWord);

console.log(`The longest word that can be built from '${inputWord}' is: ${result}`);
