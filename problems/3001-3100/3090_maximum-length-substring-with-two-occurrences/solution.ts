function maximumLengthSubstring(s: string): number {
    // Slide a window over s while tracking one count per letter: grow on
    // the right each step, then shrink from the left only while the
    // freshly added letter would exceed its budget of two occurrences.
    const counts = new Array(26).fill(0);
    let best = 0;
    let left = 0;
    for (let right = 0; right < s.length; ++right) {
        const index = s.charCodeAt(right) - 97;
        ++counts[index];
        // Only the just-extended letter can be over budget, so the window
        // never has to shrink past its first offender.
        while (counts[index] > 2) {
            --counts[s.charCodeAt(left) - 97];
            ++left;
        }
        if (right - left + 1 > best) {
            best = right - left + 1;
        }
    }
    return best;
}
