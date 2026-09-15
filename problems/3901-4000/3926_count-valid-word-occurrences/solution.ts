function countWordOccurrences(chunks: string[], queries: string[]): number[] {
    const text = chunks.join("");
    const counts = new Map<string, number>();
    let current = "";

    const flush = () => {
        if (current.length > 0) {
            counts.set(current, (counts.get(current) || 0) + 1);
            current = "";
        }
    };

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const lowercase = char >= "a" && char <= "z";
        if (char === "-") {
            const previous = i > 0 ? text[i - 1] : "";
            const next = i + 1 < text.length ? text[i + 1] : "";
            if (previous >= "a" && previous <= "z" && next >= "a" && next <= "z") {
                current += char;
            } else {
                flush();
            }
        } else if (lowercase) {
            current += char;
        } else {
            flush();
        }
    }
    flush();

    return queries.map((query) => counts.get(query) || 0);
}
