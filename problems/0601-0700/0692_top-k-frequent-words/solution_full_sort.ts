function topKFrequent(words: string[], k: number): string[] {
    // One counting pass over the array.
    const counts = new Map<string, number>();
    for (const w of words) {
        counts.set(w, (counts.get(w) || 0) + 1);
    }
    const ranked = Array.from(counts);
    // Sort every unique word under the statement's total order — count
    // descending, then word ascending — and keep the first k. The
    // comparator is explicit about both keys — never the default
    // lexicographic sort — and fully orders every pair, so no
    // sort-stability assumption can leak in.
    ranked.sort((a, b) => (a[1] !== b[1] ? b[1] - a[1] : a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
    return ranked.slice(0, k).map(([word]) => word);
}
