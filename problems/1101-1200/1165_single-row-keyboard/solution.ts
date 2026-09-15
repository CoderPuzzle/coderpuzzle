function calculateTime(keyboard: string, word: string): number {
    const index: number[] = new Array(26).fill(0);
    for (let i = 0; i < 26; ++i) index[keyboard.charCodeAt(i) - 97] = i;
    let total = 0;
    let position = 0;
    for (const ch of word) {
        const target = index[ch.charCodeAt(0) - 97];
        total += Math.abs(target - position);
        position = target;
    }
    return total;
}
