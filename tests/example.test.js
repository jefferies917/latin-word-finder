"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_1 = require("../src/example");
test('adds 1 + 2 to equal 3', () => {
    expect((0, example_1.sum)(1, 2)).toBe(3);
});
