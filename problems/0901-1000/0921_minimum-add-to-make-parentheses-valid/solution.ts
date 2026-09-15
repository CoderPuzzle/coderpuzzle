function minAddToMakeValid(s: string): number {
    // A move only inserts, so the answer is how many parentheses are
    // missing. One sweep keeps the count of '(' that no ')' has claimed:
    // a ')' consumes one when available, otherwise it is stranded —
    // nothing later in s can pair with it — and costs an inserted '('.
    // Unclaimed '(' at the end cost an inserted ')' each; both debts are
    // forced and sufficient.
    let insertions = 0;
    let opened = 0;
    for (let i = 0; i < s.length; ++i) {
        if (s[i] === "(") {
            opened++;
        } else if (opened > 0) {
            opened--;
        } else {
            insertions++;
        }
    }
    return insertions + opened;
}
