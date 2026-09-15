function sortString(s: string): string {
    const counts = new Array<number>(26).fill(0);
    for (const ch of s) counts[ch.charCodeAt(0) - 97] += 1;
    let remaining = s.length;
    const out: string[] = [];
    let forward = true;
    while (remaining > 0) {
        for (let k = 0; k < 26; k++) {
            const i = forward ? k : 25 - k;
            if (counts[i] > 0) {
                counts[i] -= 1;
                remaining -= 1;
                out.push(String.fromCharCode(97 + i));
            }
        }
        forward = !forward;
    }
    return out.join("");
}
