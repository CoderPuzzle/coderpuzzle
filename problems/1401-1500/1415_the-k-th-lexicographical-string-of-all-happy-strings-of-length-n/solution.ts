function getHappyString(n: number, k: number): string {
    const total = 3 * (1 << (n - 1));
    if (k > total) {
        return "";
    }
    const letters = ["a", "b", "c"];
    let result = "";
    let block = total / 3;
    let rank = k - 1;
    for (let i = 0; i < n; i++) {
        let candidates: string[];
        if (i === 0) {
            candidates = letters;
        } else {
            const previous = result[result.length - 1];
            candidates = letters.filter((c) => c !== previous);
        }
        const index = Math.floor(rank / block);
        rank %= block;
        result += candidates[index];
        block = Math.floor(block / 2);
    }
    return result;
}
