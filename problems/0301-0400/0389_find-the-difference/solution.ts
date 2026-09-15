// Every letter of s reappears somewhere in t, so folding both strings
// into one XOR accumulator cancels each shuffled pair and leaves only
// the added letter's code.
function findTheDifference(s: string, t: string): string {
    let code = 0;
    for (let i = 0; i < s.length; i++) {
        code ^= s.charCodeAt(i);
    }
    for (let i = 0; i < t.length; i++) {
        code ^= t.charCodeAt(i);
    }
    return String.fromCharCode(code);
}
