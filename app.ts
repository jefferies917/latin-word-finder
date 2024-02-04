import * as fs from 'fs';

class TaskWordFinder {
    private dictionarySet: Set<string>;
    private longestWord: string | undefined;

    constructor(dictionaryFileName: string) {
        const dictionaryList = this.loadDictionaryFromFile(dictionaryFileName);
        this.dictionarySet = new Set(dictionaryList);
        this.longestWord = undefined;
    }

    private loadDictionaryFromFile(fileName: string): string[] {
        try {
            const data = fs.readFileSync(fileName, 'utf8');
            return data.split('\n').map(word => word.trim());
        } catch (error) {
            console.error(`Error reading dictionary file: ${fileName}`);
            throw error;
        }
    }

    private isValidWord(word: string, availableLetters: string): boolean {
        return [...word].every(letter => availableLetters.includes(letter));
    }

    longestWordFinder(s: string): string | undefined {
        const sortedWords = Array.from(this.dictionarySet).sort((a, b) => b.length - a.length);

        for (const word of sortedWords) {
            if (word.length <= s.length && this.isValidWord(word, s)) {
                this.longestWord = word;
                return word;
            }
        }

        this.longestWord = undefined;
        return undefined;
    }

    getLongestWord(): string | undefined {
        return this.longestWord;
    }
}

const dictionaryFileName: string = 'dictionary.txt';
const taskWordFinder = new TaskWordFinder(dictionaryFileName);

const inputWord: string = 'acrdtsgr';
const result: string | undefined = taskWordFinder.longestWordFinder(inputWord);

console.log(`The longest word that can be made from '${inputWord}' is: ${result}`);
console.log(`The longest word found in the dictionary from '${inputWord}': ${taskWordFinder.getLongestWord()}`);
