// A long press only stretches a character into a run of copies of itself.
// Walk both strings with two pointers: a typed character equal to the next
// wanted one consumes it, a typed character equal to its predecessor is a
// repeat of one already consumed, and anything else cannot occur. Name must
// be fully consumed at the end.
function isLongPressedName(name: string, typed: string): boolean {
    let i = 0;
    let j = 0;
    const n = name.length;
    const m = typed.length;
    while (j < m) {
        if (i < n && name[i] === typed[j]) {
            i++;
            j++;
        } else if (j > 0 && typed[j] === typed[j - 1]) {
            j++; // a long press of the previous character
        } else {
            return false;
        }
    }
    return i === n;
}
