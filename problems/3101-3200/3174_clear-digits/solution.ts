// Survivors so far form a stack; a digit always removes the closest
// non-digit still standing to its left, which is exactly its top.
function clearDigits(s: string): string {
    const kept: string[] = [];
    for (let i = 0; i < s.length; ++i) {
        const ch = s[i];
        if (ch >= "0" && ch <= "9") {
            kept.pop();
        } else {
            kept.push(ch);
        }
    }
    return kept.join("");
}
