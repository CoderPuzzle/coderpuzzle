function lengthOfLongestSubstringTwoDistinct(s: string): number {
    // Sliding window with a character count map. The map never holds more
    // than two entries, so the window is always a valid substring and the
    // answer is simply the largest width it ever reaches.
    const counts = new Map<string, number>();
    let best = 0;
    let left = 0;
    for (let right = 0; right < s.length; ++right) {
        const ch = s[right];
        counts.set(ch, (counts.get(ch) || 0) + 1);
        // A third distinct character broke the rule: shrink from the left
        // until one character's count drains to zero and leaves the map.
        while (counts.size > 2) {
            const leftmost = s[left];
            counts.set(leftmost, (counts.get(leftmost) || 0) - 1);
            if (counts.get(leftmost) === 0) {
                counts.delete(leftmost);
            }
            ++left;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}
