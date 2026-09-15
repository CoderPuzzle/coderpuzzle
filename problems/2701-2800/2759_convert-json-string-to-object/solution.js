/**
 * @param {string} str
 * @return {any}
 */
var jsonParse = function (str) {
    // One cursor over the text, shared by every level of the descent: each
    // value advances it past exactly the characters it owns, so no character
    // is read twice and nothing is buffered beyond the values being built.
    // The input is valid JSON with no escapes and no whitespace, which keeps
    // every scan exact — a string runs to the very next quote, and a number
    // runs to the first character that cannot extend it.
    let pos = 0;

    const isNumberChar = (c) => (c >= "0" && c <= "9") || c === "-" || c === "+" || c === "." || c === "e" || c === "E";

    const readString = () => {
        const start = ++pos;
        while (str[pos] !== '"') {
            pos++;
        }
        return str.slice(start, pos++);
    };

    const readNumber = () => {
        const start = pos;
        while (pos < str.length && isNumberChar(str[pos])) {
            pos++;
        }
        return Number(str.slice(start, pos));
    };

    const parseObject = () => {
        pos++; // '{'
        const object = {};
        if (str[pos] === "}") {
            pos++;
            return object;
        }
        for (;;) {
            const key = readString();
            pos++; // ':'
            object[key] = parseValue();
            if (str[pos] === ",") {
                pos++;
                continue;
            }
            pos++; // '}'
            return object;
        }
    };

    const parseArray = () => {
        pos++; // '['
        const array = [];
        if (str[pos] === "]") {
            pos++;
            return array;
        }
        for (;;) {
            array.push(parseValue());
            if (str[pos] === ",") {
                pos++;
                continue;
            }
            pos++; // ']'
            return array;
        }
    };

    const parseValue = () => {
        const c = str[pos];
        if (c === "{") return parseObject();
        if (c === "[") return parseArray();
        if (c === '"') return readString();
        if (c === "t") {
            pos += 4;
            return true;
        }
        if (c === "f") {
            pos += 5;
            return false;
        }
        if (c === "n") {
            pos += 4;
            return null;
        }
        return readNumber();
    };

    return parseValue();
};
