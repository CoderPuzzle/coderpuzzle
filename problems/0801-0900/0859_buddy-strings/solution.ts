// A swap moves exactly two letters, so it changes two positions of s or,
// when the letters are equal, nothing at all. Count the positions where s
// and goal disagree: exactly two that cross, or none with a repeated
// letter to trade.
function buddyStrings(s: string, goal: string): boolean {
    if (s.length !== goal.length) return false;
    let first = -1;
    let second = -1;
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== goal[i]) {
            if (first === -1) first = i;
            else if (second === -1) second = i;
            else return false;
        }
    }
    if (second !== -1) {
        return s[first] === goal[second] && s[second] === goal[first];
    }
    if (first !== -1) return false;
    const seen: boolean[] = new Array(26).fill(false);
    for (let i = 0; i < s.length; i++) {
        const k = s.charCodeAt(i) - 97;
        if (seen[k]) return true;
        seen[k] = true;
    }
    return false;
}
