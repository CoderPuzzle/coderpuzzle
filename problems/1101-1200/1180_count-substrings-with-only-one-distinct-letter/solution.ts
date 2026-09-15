function countLetters(s: string): number {
    let total = 0;
    let run = 0;
    let prev = "";
    for (const ch of s) {
        // Extend the current uniform run, or start a new one; adding the run
        // length each step sums L(L+1)/2 per maximal run.
        if (ch === prev) {
            run++;
        } else {
            run = 1;
            prev = ch;
        }
        total += run;
    }
    return total;
}
