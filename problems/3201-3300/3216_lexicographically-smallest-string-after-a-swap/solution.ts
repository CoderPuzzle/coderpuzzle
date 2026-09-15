// TS strings are immutable, so the scan runs on a char array — the honest
// equivalent of the in-place algorithm. The first adjacent same-parity
// descent is the only swap worth making: it lowers an earlier position than
// any later legal swap could.
function getSmallestString(s: string): string {
    const chars: string[] = s.split("");
    for (let i = 0; i + 1 < chars.length; i++) {
        if (chars[i] > chars[i + 1] && Number(chars[i]) % 2 === Number(chars[i + 1]) % 2) {
            // At most one swap is allowed, so stop right after it.
            [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
            break;
        }
    }
    return chars.join("");
}
