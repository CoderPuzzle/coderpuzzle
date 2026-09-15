function kthCharacter(k: number, operations: number[]): string {
    // The final word can span 2^100 characters, so it is never built.
    // Replay backwards from k: operation i (which doubles the length from
    // 2^i to 2^(i+1)) only touches the position when k sits in its appended
    // half (k > 2^i), in which case the character is a copy of the one at
    // k - 2^i -- shifted once more if the type is 1. Every qualifying
    // type-1 operation advances the letter cyclically by one past 'z', and
    // starting from "a" the answer is that accumulated shift mod 26.
    // Plain numbers stay exact: k <= 10^14 sits far below 2^53 and each
    // step only halves position, while the 2^i thresholds are compared --
    // never materialized as exact integers beyond 2^53 -- via 2 ** i,
    // whose floating value stays exact up to 2^1023.
    let position = k;
    let shifts = 0;
    for (let index = operations.length - 1; index >= 0; index--) {
        const half = 2 ** index;
        if (position > half) {
            position -= half;
            if (operations[index] === 1) {
                shifts += 1;
            }
        }
    }
    return String.fromCharCode(97 + (shifts % 26));
}
