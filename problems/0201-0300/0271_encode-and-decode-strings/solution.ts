// Length-prefixed chunks: each string travels as its decimal length, a
// colon, then the string itself, concatenated in order. The prefix says
// exactly how many characters belong to the piece, so no colon or digit
// inside a string can be mistaken for structure.
class Codec {
    constructor() {}

    encode(strs: string[]): string {
        return strs.map((word) => word.length + ":" + word).join("");
    }

    // The mirror walk: digits up to the next colon are the decimal length,
    // that many characters are the next string, and the cursor lands on
    // the following length.
    decode(s: string): string[] {
        const words: string[] = [];
        let position = 0;
        while (position < s.length) {
            const colon = s.indexOf(":", position);
            const length = parseInt(s.slice(position, colon), 10);
            words.push(s.slice(colon + 1, colon + 1 + length));
            position = colon + 1 + length;
        }
        return words;
    }
}
