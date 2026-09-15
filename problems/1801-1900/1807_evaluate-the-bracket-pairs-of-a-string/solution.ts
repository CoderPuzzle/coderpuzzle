function evaluate(s: string, knowledge: string[][]): string {
    // One left-to-right pass: a '(' hands control to the matching ')',
    // the enclosed key goes through the map, everything else is copied
    // verbatim. Values are bracket-free, so nothing emitted is ever
    // re-examined.
    const known = new Map<string, string>();
    for (const [key, value] of knowledge) {
        known.set(key, value);
    }
    const parts: string[] = [];
    let i = 0;
    while (i < s.length) {
        if (s[i] === "(") {
            const j = s.indexOf(")", i);
            parts.push(known.get(s.substring(i + 1, j)) ?? "?");
            i = j + 1;
        } else {
            parts.push(s[i]);
            i++;
        }
    }
    return parts.join("");
}
