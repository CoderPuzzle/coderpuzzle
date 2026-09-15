function shortestSequence(rolls: number[], k: number): number {
    // A "complete window" (all k faces seen since the last reset)
    // extends coverage to sequences one roll longer.
    const seen = new Set<number>();
    // answer = (#complete windows so far) + 1; starts at 1 because with
    // zero windows some face never rolled, so length 1 already fails.
    let answer = 1;
    for (const r of rolls) {
        seen.add(r);
        if (seen.size === k) {
            // Window complete: whatever prefix was matched inside it,
            // every next symbol is available after this point.
            answer += 1;
            seen.clear();
        }
    }
    // No complete set of faces remains, so a sequence of this length
    // cannot be matched as a subsequence.
    return answer;
}
