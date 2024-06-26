import * as fs from 'fs'; // Import the Node.js file system module for file operations

class TaskWordFinder {
    private dictionarySet: Set<string>; // Set to store the words from the dictionary file
    private longestWord: string | undefined; // Variable to store the longest word found

    constructor(dictionaryFileName: string) {
        // Constructor function to initialize the TaskWordFinder object
        const dictionaryList = this.loadDictionaryFromFile(dictionaryFileName); // Load dictionary from file
        this.dictionarySet = new Set(dictionaryList); // Store words in a Set for efficient lookup
        this.longestWord = undefined; // Initialize longest word as undefined
    }

    // Method to load dictionary from file and return an array of words
    private loadDictionaryFromFile(fileName: string): string[] {
        try {
            const data = fs.readFileSync(fileName, 'utf8'); // Read dictionary file synchronously
            return data.split('\n').map(word => word.trim()); // Split words by newline and trim whitespace
        } catch (error) {
            console.error(`Error reading dictionary file: ${fileName}`); // Log error if file reading fails
            throw error; // Throw the error for handling by caller
        }
    }

    // Method to check if a word can be formed using available letters
    private isValidWord(word: string, availableLetters: string): boolean {
        const availableLetterSet = new Set(availableLetters);
        const wordLetterSet = new Set(word);

        // Check if every letter in the word is present in the available letters
        return [...wordLetterSet].every(letter => availableLetterSet.has(letter));
    }



    longestWordFinder(s: string): string | undefined {
        const sortedWords = Array.from(this.dictionarySet).sort((a, b) => b.length - a.length); // Sort words by length in descending order

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
    getLongestWord(): string | undefined {
        return this.longestWord; // Return the longest word found
    }
}

// Only run this part if the script is executed directly
if (require.main === module) {
    const dictionaryFileName: string = 'dictionary.txt'; // Name of the dictionary file
    const taskWordFinder = new TaskWordFinder(dictionaryFileName); // Create a new TaskWordFinder object

    // Extract input letters from command line arguments
    const inputWord: string = process.argv[2] ? process.argv[2].toLowerCase() : ''; // Input letters to find the longest word
    if (!inputWord) {
        throw new Error('Please provide letters as command line argument.');
    }

    const result: string | undefined = taskWordFinder.longestWordFinder(inputWord); // Find the longest word

    console.log(`The longest word that can be made from '${inputWord}' is: ${result}`); // Log the result
}

export { TaskWordFinder };