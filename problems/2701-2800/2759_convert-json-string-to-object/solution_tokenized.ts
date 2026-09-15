function jsonParse(str: string): any {
    // Pass one — the lexer: flatten the whole text into typed tokens.
    // Punctuation becomes one-character tokens, each quoted run becomes a
    // string token sliced to its closing quote (exact, because valid input
    // never escapes), true/false/null become literal tokens, and every run
    // of number characters becomes a single number token. The kind rides
    // beside the value, so a string's contents — even punctuation-shaped
    // text — can never be mistaken for structure.
    const isNumberChar = (c: string): boolean =>
        (c >= "0" && c <= "9") || c === "-" || c === "+" || c === "." || c === "e" || c === "E";

    const tokens: Array<{ kind: string; value: any }> = [];
    let pos = 0;
    while (pos < str.length) {
        const c = str[pos];
        if (c === "{" || c === "}" || c === "[" || c === "]" || c === ":" || c === ",") {
            tokens.push({ kind: "punct", value: c });
            pos++;
        } else if (c === '"') {
            const start = ++pos;
            while (str[pos] !== '"') {
                pos++;
            }
            tokens.push({ kind: "string", value: str.slice(start, pos++) });
        } else if (c === "t") {
            tokens.push({ kind: "literal", value: true });
            pos += 4;
        } else if (c === "f") {
            tokens.push({ kind: "literal", value: false });
            pos += 5;
        } else if (c === "n") {
            tokens.push({ kind: "literal", value: null });
            pos += 4;
        } else {
            const start = pos;
            while (pos < str.length && isNumberChar(str[pos])) {
                pos++;
            }
            tokens.push({ kind: "number", value: Number(str.slice(start, pos)) });
        }
    }

    // Pass two — the parser: pure grammar over tokens, never characters.
    // A string, number, or literal token already IS its value; a container
    // token recurses, reading `key : value` pairs or comma-separated
    // elements until the matching closer is consumed.
    let next = 0;

    const parseValue = (): any => {
        const { kind, value } = tokens[next++];
        if (kind !== "punct") {
            return value;
        }
        if (value === "{") {
            const object: Record<string, any> = {};
            if (tokens[next].value === "}") {
                next++;
                return object;
            }
            for (;;) {
                const key = tokens[next++].value;
                next++; // ':'
                object[key] = parseValue();
                const closer = tokens[next++].value;
                if (closer === "}") {
                    return object;
                }
            }
        }
        const array: any[] = [];
        if (tokens[next].value === "]") {
            next++;
            return array;
        }
        for (;;) {
            array.push(parseValue());
            const closer = tokens[next++].value;
            if (closer === "]") {
                return array;
            }
        }
    };

    return parseValue();
}
