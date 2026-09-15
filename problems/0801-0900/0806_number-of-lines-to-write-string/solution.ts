function numberOfLines(widths: number[], s: string): number[] {
    // Only two numbers matter while the letters are written in order:
    // how wide the line being filled already is, and how many lines
    // have been started. A letter joins the current line when it keeps
    // the total within 100 pixels and opens the next line when it would
    // push past it, so a single left-to-right sweep over s ends holding
    // both answers: the line count and the last line's width.
    let lines = 1;
    let current = 0;
    for (const ch of s) {
        const width = widths[ch.charCodeAt(0) - 97];
        if (current + width > 100) {
            lines++;
            current = width;
        } else {
            current += width;
        }
    }
    return [lines, current];
}
