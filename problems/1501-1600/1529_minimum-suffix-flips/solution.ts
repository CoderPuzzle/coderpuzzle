function minFlips(target: string): number {
    // `current` tracks the bit the string holds at the position just
    // processed, starting from the initial all-zero string. Each mismatch
    // means the suffix from here on needs one more flip, and flips the
    // tracked bit to match.
    let current = "0";
    let count = 0;
    for (const c of target) {
        if (c !== current) {
            count++;
            current = c;
        }
    }
    return count;
}
