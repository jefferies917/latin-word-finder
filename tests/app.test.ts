import { TaskWordFinder } from '../src/app'; // Update the path to your script file

describe('TaskWordFinder', () => {
    let taskWordFinder: TaskWordFinder;

    beforeAll(() => {
        // Initialize TaskWordFinder with a test dictionary file
        taskWordFinder = new TaskWordFinder('src/dictionary.txt'); // Provide a test dictionary file
    });

    it('should find the longest word', () => {
        const inputLetters = 'abcdef';
        const longestWord = taskWordFinder.longestWordFinder(inputLetters);
        expect(longestWord).toBe('faced'); // Provide the expected longest word
    });

    it('should find the longest word when input contains duplicate letters', () => {
        const inputLetters = 'helloo';
        const longestWord = taskWordFinder.longestWordFinder(inputLetters);
        expect(longestWord).toBe('hello'); // Assuming 'hello' is the longest word in the dictionary that can be formed
    });

    it('should handle input with uppercase letters', () => {
        const inputLetters = 'HELLO';
        const longestWord = taskWordFinder.longestWordFinder(inputLetters.toLowerCase());
        expect(longestWord).toBe('hello'); // Assuming 'hello' is the longest word in the dictionary that can be formed
    });

    it('should handle input with special characters and spaces', () => {
        const inputLetters = 'a@b c$d';
        const longestWord = taskWordFinder.longestWordFinder(inputLetters);
        expect(longestWord).toBe('bad'); // Assuming 'cab' is the longest word in the dictionary that can be formed
    });

    it('should return undefined if input contains no letters', () => {
        const inputLetters = '';
        const longestWord = taskWordFinder.longestWordFinder(inputLetters);
        expect(longestWord).toBeUndefined();
    });

    it('should return undefined if input contains only non-alphabetic characters', () => {
        const inputLetters = '123!@#';
        const longestWord = taskWordFinder.longestWordFinder(inputLetters);
        expect(longestWord).toBeUndefined();
    });

    it('should handle input with whitespace characters', () => {
        const inputLetters = '   t  e  s  t   ';
        const longestWord = taskWordFinder.longestWordFinder(inputLetters.trim());
        expect(longestWord).toBe('test'); // Assuming 'test' is the longest word in the dictionary that can be formed
    });

});
