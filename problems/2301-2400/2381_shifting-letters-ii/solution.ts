function shiftingLetters(s: string, shifts: number[][]): string {
    const n = s.length;
    // Shifts commute, so only the net shift per position matters.
    // Extra slot at n keeps every end+1 marker in bounds.
    const diff: number[] = new Array(n + 1).fill(0);
    for (const [start, end, dir] of shifts) {
        const delta = dir === 1 ? 1 : -1;
        // +delta at start, -delta just past end: an O(1) range update.
        diff[start] += delta;
        diff[end + 1] -= delta;
    }
    const chars: string[] = [];
    let shift = 0;
    for (let i = 0; i < n; i++) {
        // Prefix sum yields the net shift; double % keeps it in [0, 26)
        // even when negative (backward shifts, wrap before 'a').
        shift += diff[i];
        const c = s.charCodeAt(i) - 97;
        chars.push(String.fromCharCode(97 + ((((c + shift) % 26) + 26) % 26)));
    }
    return chars.join("");
}
