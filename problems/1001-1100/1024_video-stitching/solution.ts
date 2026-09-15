function videoStitching(clips: number[][], time: number): number {
    // Jump-game greedy over clips sorted by start.
    const ordered = [...clips].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let count = 0;
    let covered = 0;
    let farthest = 0;
    let i = 0;
    const n = ordered.length;
    while (covered < time) {
        // Cursor i never resets: every clip starting at or before `covered`
        // is examined once, tracking the farthest reach it enables.
        while (i < n && ordered[i][0] <= covered) {
            if (ordered[i][1] > farthest) {
                farthest = ordered[i][1];
            }
            i++;
        }
        // No usable clip reaches past the current coverage: an unbridgeable gap.
        if (farthest === covered) {
            return -1;
        }
        // Take one clip — the farthest-reaching — and jump the frontier.
        covered = farthest;
        count++;
    }
    return count;
}
