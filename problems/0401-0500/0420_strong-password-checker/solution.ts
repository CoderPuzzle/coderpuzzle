// A password is priced by three counts: how many of the three character
// classes are missing, how many replaces the runs of length >= 3 need, and —
// over length 20 — where the mandatory deletions retire the most replaces.
function strongPasswordChecker(password: string): number {
    const n = password.length;
    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;
    for (const c of password) {
        if (c >= "a" && c <= "z") {
            hasLower = true;
        } else if (c >= "A" && c <= "Z") {
            hasUpper = true;
        } else if (c >= "0" && c <= "9") {
            hasDigit = true;
        }
    }
    // Each missing class needs one dedicated step to introduce.
    const missing = 3 - ((hasLower ? 1 : 0) + (hasUpper ? 1 : 0) + (hasDigit ? 1 : 0));
    // Every maximal run of length >= 3, e.g. "aaabbb" -> [3, 3].
    const runs: number[] = [];
    let i = 0;
    while (i < n) {
        let j = i;
        while (j < n && password[j] === password[i]) {
            j++;
        }
        if (j - i >= 3) {
            runs.push(j - i);
        }
        i = j;
    }
    // Too short: the inserts that reach length 6 can also break the one
    // possible run and carry the missing classes.
    if (n < 6) {
        return Math.max(6 - n, missing);
    }
    // A replace fixes a run slot and can double as a class fix, so the
    // mid regime is a max, not a sum.
    let replace = 0;
    for (const length of runs) {
        replace += Math.floor(length / 3);
    }
    if (n <= 20) {
        return Math.max(missing, replace);
    }
    // Too long: n - 20 deletions are unavoidable. A deletion retires a
    // replace only when it pushes a run below a multiple of 3, so the
    // budget goes to runs sitting on a multiple first (1 deletion), then
    // remainder 1 (2 deletions), then remainder 2 (3 deletions).
    let toDelete = n - 20;
    for (let remainder = 0; remainder < 3; remainder++) {
        for (const length of runs) {
            if (length % 3 !== remainder) {
                continue;
            }
            const cost = remainder + 1;
            if (toDelete >= cost) {
                toDelete -= cost;
                replace -= 1;
            }
        }
    }
    replace = Math.max(replace - Math.floor(toDelete / 3), 0);
    return n - 20 + Math.max(missing, replace);
}
