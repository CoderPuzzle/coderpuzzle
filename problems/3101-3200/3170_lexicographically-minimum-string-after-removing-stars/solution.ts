// Each '*' removes the newest surviving copy of the smallest letter
// seen so far; deleting anything larger, or an older copy of that
// letter, can only leave a bigger remainder behind.
function clearStars(s: string): string {
    const slots: number[][] = Array.from({ length: 26 }, () => []);
    const dropped = new Uint8Array(s.length);
    for (let i = 0; i < s.length; ++i) {
        const ch = s[i];
        if (ch === "*") {
            dropped[i] = 1;
            for (let c = 0; c < 26; ++c) {
                if (slots[c].length > 0) {
                    dropped[slots[c].pop()!] = 1;
                    break;
                }
            }
        } else {
            slots[ch.charCodeAt(0) - 97].push(i);
        }
    }
    const kept: string[] = [];
    for (let i = 0; i < s.length; ++i) {
        if (!dropped[i]) {
            kept.push(s[i]);
        }
    }
    return kept.join("");
}
