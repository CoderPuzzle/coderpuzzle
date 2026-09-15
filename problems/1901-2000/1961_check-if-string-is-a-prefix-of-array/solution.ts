function isPrefixString(s: string, words: string[]): boolean {
    // Match each word in order against the front of s: a prefix string is
    // exactly the concatenation of some first-k words, so once s is fully
    // consumed by exact word matches it must be one.
    let i = 0;
    for (const word of words) {
        if (s.slice(i, i + word.length) !== word) return false;
        i += word.length;
        if (i === s.length) return true;
    }
    return false;
}
