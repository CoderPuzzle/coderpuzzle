function combinationSum3(k: number, n: number): number[][] {
    // Trying digits in ascending order from a rising start floor makes every
    // combination ascending and the whole list lexicographic.
    const combinations: number[][] = [];
    const current: number[] = [];
    // start moves past each picked digit, so each number 1 through 9 is used
    // at most once.
    const backtrack = (start: number, slots: number, remaining: number): void => {
        if (slots === 0) {
            // k digits chosen: valid only when they sum to n exactly.
            if (remaining === 0) combinations.push([...current]);
            return;
        }
        // A digit must leave slots - 1 larger digits behind, which caps it
        // at 10 - slots.
        for (let digit = start; digit <= 10 - slots; digit++) {
            // Digits grow across the loop, so the first one that overshoots
            // the remaining budget ends the loop.
            if (digit > remaining) break;
            current.push(digit);
            backtrack(digit + 1, slots - 1, remaining - digit);
            current.pop();
        }
    };
    backtrack(1, k, n);
    return combinations;
}
