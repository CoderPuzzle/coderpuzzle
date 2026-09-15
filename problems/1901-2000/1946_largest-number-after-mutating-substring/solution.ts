// Greedy: the leftmost digit change strictly improves is where the mutation
// must start -- an earlier digit is more significant, so improving it
// dominates any later start. Extend through every non-hurting digit
// (change[d] >= d) and stop at the first hurting one, since the mutated
// substring must stay contiguous.
function maximumNumber(num: string, change: number[]): string {
    const digits = num.split("");
    let started = false;
    for (let i = 0; i < num.length; ++i) {
        const d = num.charCodeAt(i) - 48;
        if (change[d] > d) {
            started = true;
            digits[i] = String(change[d]);
        } else if (change[d] < d && started) {
            break;
        }
    }
    return digits.join("");
}
