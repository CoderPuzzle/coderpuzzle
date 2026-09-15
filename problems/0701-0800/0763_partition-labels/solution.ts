function partitionLabels(s: string): number[] {
    // A part must extend to the last occurrence of every letter it
    // contains, so record where each letter finally appears.
    const last = new Array(26).fill(-1);
    for (let i = 0; i < s.length; i++) {
        last[s.charCodeAt(i) - 97] = i;
    }
    const parts: number[] = [];
    let start = 0,
        end = 0;
    for (let i = 0; i < s.length; i++) {
        // end = farthest last occurrence among letters opened so far.
        end = Math.max(end, last[s.charCodeAt(i) - 97]);
        // i === end: every letter opened in this span also closes in
        // it, so a cut here is legal.
        if (i === end) {
            parts.push(end - start + 1);
            start = i + 1;
        }
    }
    return parts;
}
