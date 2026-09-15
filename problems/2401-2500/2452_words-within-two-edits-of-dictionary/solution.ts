function twoEditWords(queries: string[], dictionary: string[]): string[] {
    // A query survives iff some dictionary word differs in at most two
    // positions; the strings are equal-length, so a position count is all it
    // takes.
    const result: string[] = [];
    for (const q of queries) {
        for (const d of dictionary) {
            let diff = 0;
            for (let i = 0; i < q.length; i++) {
                if (q[i] !== d[i]) diff++;
            }
            if (diff <= 2) {
                result.push(q);
                break;
            }
        }
    }
    return result;
}
