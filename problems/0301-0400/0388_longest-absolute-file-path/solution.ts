// depths[d] is the absolute-path length of the most recent entry seen at
// depth d; a name at depth d extends the entry at depth d - 1.
function lengthLongestPath(input: string): number {
    const depths: number[] = [0];
    let longest = 0;
    for (const token of input.split("\n")) {
        let depth = 0;
        while (token.charAt(depth) === "\t") {
            depth++;
        }
        const name = token.slice(depth);
        // The path to this entry is its parent's path, one '/' separator,
        // then the name itself (the root level has no separator).
        const path = (depth > 0 ? depths[depth - 1] + 1 : 0) + name.length;
        if (depth < depths.length) {
            depths[depth] = path;
        } else {
            depths.push(path);
        }
        // Files are exactly the names that contain a dot.
        if (name.includes(".")) {
            longest = Math.max(longest, path);
        }
    }
    return longest;
}
