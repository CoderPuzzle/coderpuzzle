function findReplaceString(s: string, indices: number[], sources: string[], targets: string[]): string {
    // Replacements are simultaneous: each match is judged against the
    // original string, so first record every operation that succeeds —
    // sources[i] read from indices[i] — as a map from start position to
    // operation, then walk s once. A position holding a winner emits its
    // target and skips the consumed source; every other character copies
    // through unchanged. The non-overlap guarantee means a skip never
    // lands inside another winner's span.
    const match: number[] = new Array<number>(s.length).fill(-1);
    for (let op = 0; op < indices.length; op++) {
        if (s.startsWith(sources[op], indices[op])) {
            match[indices[op]] = op;
        }
    }
    const pieces: string[] = [];
    let i = 0;
    while (i < s.length) {
        const op = match[i];
        if (op >= 0) {
            pieces.push(targets[op]);
            i += sources[op].length;
        } else {
            pieces.push(s[i]);
            i += 1;
        }
    }
    return pieces.join("");
}
