function groupStrings(strings: string[]): string[][] {
    const groups = new Map<string, string[]>();
    for (const word of strings) {
        // Anchoring on the first letter canonicalizes the shifting sequence:
        // left-shift the word until that letter becomes 'a' — the same gap
        // from it to every letter, mod 26 — so shifted copies produce
        // identical keys and unshiftable strings never collide on one.
        const first = word.charCodeAt(0);
        let key = "";
        for (let i = 0; i < word.length; ++i) {
            key += String.fromCharCode(97 + ((word.charCodeAt(i) - first + 26) % 26));
        }
        // Every word lands in exactly one bucket, alongside precisely its
        // shifts; a first-seen key opens the bucket.
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)!.push(word);
    }
    // The buckets are the required groups.
    return Array.from(groups.values());
}
