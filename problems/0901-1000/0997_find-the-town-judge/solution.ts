function findJudge(n: number, trust: number[][]): number {
    const score = new Array(n + 1).fill(0);
    for (const [a, b] of trust) {
        score[a]--;
        score[b]++;
    }

    for (let person = 1; person <= n; person++) {
        if (score[person] === n - 1) {
            return person;
        }
    }
    return -1;
}
