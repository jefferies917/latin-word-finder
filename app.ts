class WordFinder {
    private dictionarySet: Set<string>;

    constructor(dictionaryList: string[]) {
        this.dictionarySet = new Set(dictionaryList);
    }

    private isValidWord(word: string, availableLetters: string): boolean {
        // Check if the word can be formed using available letters
        return [...word].every(letter => availableLetters.includes(letter));
    }

    longestWord(s: string): string | undefined {
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
const dictionaryList: string[] = ["cat", "dog", "rat", "art", "car", "cards"];
const wordFinder = new WordFinder(dictionaryList);

// Find the longest word that can be formed from the given letters
const inputWord: string = "acrdts";
const result: string | undefined = wordFinder.longestWord(inputWord);

console.log(`The longest word that can be built from '${inputWord}' is: ${result}`);
