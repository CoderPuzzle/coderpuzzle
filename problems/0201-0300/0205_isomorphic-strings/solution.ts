// The contract is symmetric and names its own data structure: every character
// of s keeps one consistent replacement (forward), and no two characters share
// a replacement (reverse). Each clause is one map, enforced together in a
// single order-preserving pass.
function isIsomorphic(s: string, t: string): boolean {
    if (s.length !== t.length) {
        // Strings of different lengths can never be aligned position for position.
        return false;
    }
    const forward = new Map<string, string>();
    const reverse = new Map<string, string>();
    for (let index = 0; index < s.length; ++index) {
        const sChar = s[index];
        const tChar = t[index];
        // One branch per contract clause: a source already bound to a
        // different replacement, or a target already claimed by another source.
        if (forward.has(sChar) && forward.get(sChar) !== tChar) return false;
        if (reverse.has(tChar) && reverse.get(tChar) !== sChar) return false;
        forward.set(sChar, tChar);
        reverse.set(tChar, sChar);
    }
    return true;
}
