function residuePrefixes(s: string): number {
    // The prefix of length i is a residue when its distinct-character
    // count equals i % 3. A single left-to-right pass carries that
    // count in a seen-set: after absorbing character i the set holds
    // exactly the distinct characters of the prefix that ends there.
    // Lengths divisible by 3 never qualify (a non-empty prefix has at
    // least one distinct character), which the comparison covers
    // without special-casing.
    const seen = new Set<string>();
    let count = 0;
    let i = 0;
    for (const ch of s) {
        i += 1;
        seen.add(ch);
        if (seen.size === i % 3) {
            count += 1;
        }
    }
    return count;
}
