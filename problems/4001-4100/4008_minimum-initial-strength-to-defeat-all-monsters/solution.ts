function minInitialStrength(monsters: number[], boosts: number[][]): number {
    const n = monsters.length;
    const delta = new Array<number>(n + 1).fill(0);
    for (const [left, right, value] of boosts) {
        delta[left] += value;
        delta[right + 1] -= value;
    }

    let bonus = 0;
    let prefix = 0;
    let answer = 0;
    for (let i = 0; i < n; ++i) {
        bonus += delta[i];
        const needed = monsters[i] - bonus;
        if (needed > 0) {
            answer = Math.max(answer, prefix + needed);
        }
        prefix += monsters[i];
    }
    return answer;
}
