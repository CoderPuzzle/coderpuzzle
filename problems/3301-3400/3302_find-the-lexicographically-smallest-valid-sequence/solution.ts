function validSequence(word1: string, word2: string): number[] {
    // last[j] anchors where word2[j:] is still exactly embeddable: one
    // right-to-left sweep matches the tail of word2 against word1 and
    // records, per slot, the index that consumed its character. The
    // forward walk then takes every exact match immediately and spends
    // the single allowed change only when the guard proves the rest of
    // word2 still fits exactly after it (last slot, or i before
    // last[j + 1]); a change already spent forbids further mismatches.
    const m = word2.length;
    const ans = new Array<number>(m);
    const last = new Array<number>(m).fill(-1);
    let i = word1.length - 1;
    let j = m - 1;
    while (i >= 0 && j >= 0) {
        if (word1[i] === word2[j]) {
            last[j--] = i;
        }
        --i;
    }
    let canChange = true;
    j = 0;
    for (i = 0; i < word1.length; ++i) {
        if (j === m) {
            break;
        }
        if (word1[i] === word2[j]) {
            ans[j++] = i;
        } else if (canChange && (j === m - 1 || i < last[j + 1])) {
            canChange = false;
            ans[j++] = i;
        }
    }
    return j === m ? ans : [];
}
