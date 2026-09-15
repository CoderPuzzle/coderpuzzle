function removeComments(source: string[]): string[] {
    // Each comment is decided by reading order — line by line, left to
    // right, first marker wins — so one pass with a single flag (inside a
    // block comment) and one buffer for the line under construction is the
    // whole computation. Entering or leaving a comment skips two characters,
    // so the closer of "/*/" never overlaps its opener. The buffer flushes
    // only when a line ends outside a block: an emptied line is dropped,
    // code before an opener joins code after its closer.
    const result: string[] = [];
    let buffer = "";
    let inBlock = false;
    for (const line of source) {
        let i = 0;
        while (i < line.length) {
            if (inBlock) {
                if (line[i] === "*" && line[i + 1] === "/") {
                    inBlock = false;
                    i += 2;
                } else {
                    i += 1;
                }
            } else if (line[i] === "/" && line[i + 1] === "/") {
                break;
            } else if (line[i] === "/" && line[i + 1] === "*") {
                inBlock = true;
                i += 2;
            } else {
                buffer += line[i];
                i += 1;
            }
        }
        if (!inBlock) {
            if (buffer.length > 0) {
                result.push(buffer);
            }
            buffer = "";
        }
    }
    return result;
}
