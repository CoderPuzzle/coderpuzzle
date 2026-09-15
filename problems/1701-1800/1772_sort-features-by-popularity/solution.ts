function sortFeatures(features: string[], responses: string[]): string[] {
    // A response contributes to a feature at most once: count each
    // distinct word of the response that names a feature.
    const popularity = new Map<string, number>();
    for (const f of features) {
        popularity.set(f, 0);
    }
    for (const response of responses) {
        const seen = new Set<string>();
        for (const word of response.split(" ")) {
            if (!seen.has(word)) {
                seen.add(word);
                if (popularity.has(word)) {
                    popularity.set(word, (popularity.get(word) ?? 0) + 1);
                }
            }
        }
    }
    // Total order: higher popularity first, then the earlier original
    // index — the comparator fully orders every pair, so no sort
    // stability is relied on.
    const order = features.map((_, i) => i);
    order.sort((a, b) => {
        const pa = popularity.get(features[a]) ?? 0;
        const pb = popularity.get(features[b]) ?? 0;
        return pa !== pb ? pb - pa : a - b;
    });
    return order.map((i) => features[i]);
}
