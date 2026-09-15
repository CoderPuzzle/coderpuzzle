function lastNonEmptyString(s: string): string {
    const counts = new Array<number>(26).fill(0);
    for (let index = 0; index < s.length; index++) {
        counts[s.charCodeAt(index) - 97]++;
    }
    const top = Math.max(...counts);
    const taken = new Array<boolean>(26).fill(false);
    const kept: string[] = [];
    for (let index = s.length - 1; index >= 0; index--) {
        const slot = s.charCodeAt(index) - 97;
        if (counts[slot] === top && !taken[slot]) {
            taken[slot] = true;
            kept.push(s[index]);
        }
    }
    return kept.reverse().join("");
}
