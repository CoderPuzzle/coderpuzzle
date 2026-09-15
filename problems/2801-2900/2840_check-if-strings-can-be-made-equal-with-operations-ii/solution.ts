// Swapping indices whose distance is even keeps every character inside its own
// index-parity class, and any two positions of one class are directly
// swappable, so each class is freely rearrangeable. The strings can therefore
// be made equal exactly when each parity class holds the same multiset of
// characters in both strings.
function checkStrings(s1: string, s2: string): boolean {
    const evenCounts = new Array<number>(26).fill(0);
    const oddCounts = new Array<number>(26).fill(0);
    for (let index = 0; index < s1.length; ++index) {
        const counts = index % 2 === 0 ? evenCounts : oddCounts;
        ++counts[s1.charCodeAt(index) - 97];
    }
    for (let index = 0; index < s2.length; ++index) {
        const counts = index % 2 === 0 ? evenCounts : oddCounts;
        const code = s2.charCodeAt(index) - 97;
        if (--counts[code] < 0) {
            // s2's parity class needs a copy this character s1 cannot supply.
            return false;
        }
    }
    return true;
}
