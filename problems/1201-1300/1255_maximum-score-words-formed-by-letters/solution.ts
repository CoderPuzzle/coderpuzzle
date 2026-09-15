function maxScoreWords(words: string[], letters: string[], score: number[]): number {
    // 26-entry count of the letter pool
    const available: number[] = new Array(26).fill(0);
    for (const ch of letters) {
        available[ch.charCodeAt(0) - 97]++;
    }
    // precompute each word's letter-requirement vector and total score so the
    // recursion works on counts only (n <= 14 makes 2^n fine)
    const n = words.length;
    const needs: number[][] = [];
    const values: number[] = [];
    for (const w of words) {
        const need: number[] = new Array(26).fill(0);
        let value = 0;
        for (let idx = 0; idx < w.length; idx++) {
            const j = w.charCodeAt(idx) - 97;
            need[j]++;
            value += score[j];
        }
        needs.push(need);
        values.push(value);
    }

    let best = 0;

    const dfs = (i: number, remaining: number[], total: number): void => {
        // every node is already a complete valid selection (the rest can be
        // skipped), so compare best here rather than only at leaves
        if (total > best) best = total;
        if (i === n) return;
        // branch 1: always explore skipping word i
        dfs(i + 1, remaining, total);
        // branch 2: take word i only when the pool covers it; an infeasible
        // word simply prunes that subtree
        const need = needs[i];
        let ok = true;
        for (let j = 0; j < 26; j++) {
            if (remaining[j] < need[j]) {
                ok = false;
                break;
            }
        }
        if (ok) {
            const next = remaining.slice();
            for (let j = 0; j < 26; j++) next[j] -= need[j];
            dfs(i + 1, next, total + values[i]);
        }
    };

    dfs(0, available, 0);
    return best;
}
