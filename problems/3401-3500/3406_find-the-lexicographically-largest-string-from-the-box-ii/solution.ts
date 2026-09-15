function answerString(word: string, numFriends: number): string {
    // Every piece of every split is a substring of length at most
    // n - numFriends + 1, and the largest such substring starts where
    // the lexicographically largest suffix starts, truncated to that cap.
    const n = word.length;
    if (numFriends === 1) {
        return word;
    }
    const limit = n - numFriends + 1;
    // Duel for the start of the largest suffix: i is the champion, j the
    // challenger, k the offset at which they currently tie.
    let i = 0,
        j = 1,
        k = 0;
    while (j + k < n) {
        if (word[i + k] === word[j + k]) {
            k++;
        } else if (word[i + k] < word[j + k]) {
            // Challenger wins: suffixes i..i+k all lose to j..j+k.
            i += k + 1;
            if (i >= j) {
                j = i + 1;
            }
            k = 0;
        } else {
            // Champion wins: suffixes j..j+k all lose to i..i+k.
            j += k + 1;
            k = 0;
        }
    }
    return word.slice(i, i + Math.min(limit, n - i));
}
