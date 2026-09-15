function fullJustify(words: string[], maxWidth: number): string[] {
    // Greedy packing: the current line keeps accepting words while its letters
    // plus one joining space per gap still fit in maxWidth; the first word
    // that would overflow opens a new line.
    const lines: string[][] = [];
    let current: string[] = [];
    let letters = 0;
    for (const word of words) {
        if (current.length > 0 && letters + word.length + current.length > maxWidth) {
            lines.push(current);
            current = [];
            letters = 0;
        }
        current.push(word);
        letters += word.length;
    }
    lines.push(current);

    const last = lines.length - 1;
    return lines.map((line: string[], index: number): string => {
        // The last line, and any line holding a single word, is
        // left-justified: single spaces, padding all on the tail.
        if (index === last || line.length === 1) {
            return line.join(" ").padEnd(maxWidth);
        }
        let letters = 0;
        for (const word of line) letters += word.length;
        const gaps = line.length - 1;
        const base = Math.floor((maxWidth - letters) / gaps);
        const extra = (maxWidth - letters) % gaps;
        let text = "";
        for (let gap = 0; gap < gaps; ++gap) {
            // Every gap gets `base` spaces and the leftmost `extra` gaps one
            // more, so left slots are never narrower than right ones.
            text += line[gap] + " ".repeat(base + (gap < extra ? 1 : 0));
        }
        return text + line[gaps];
    });
}
