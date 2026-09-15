function countGoodIntegersOnPath(l: number, r: number, directions: string): number {
    const selected = new Array<boolean>(16).fill(false);
    let row = 0;
    let column = 0;
    selected[0] = true;
    for (const move of directions) {
        if (move === "D") row++;
        else column++;
        selected[row * 4 + column] = true;
    }

    function countUpTo(bound: number): number {
        if (bound < 0) return 0;
        const digits = String(bound).padStart(16, "0").split("").map(Number);
        let dp: number[][] = Array.from({ length: 2 }, () => new Array(11).fill(0));
        dp[1][10] = 1;
        for (let position = 0; position < 16; position++) {
            const next: number[][] = Array.from({ length: 2 }, () => new Array(11).fill(0));
            for (let tight = 0; tight < 2; tight++) {
                const limit = tight ? digits[position] : 9;
                for (let previous = 0; previous <= 10; previous++) {
                    const ways = dp[tight][previous];
                    if (ways === 0) continue;
                    for (let digit = 0; digit <= limit; digit++) {
                        if (selected[position] && previous !== 10 && digit < previous) continue;
                        const nextPrevious = selected[position] ? digit : previous;
                        const nextTight = tight === 1 && digit === limit ? 1 : 0;
                        next[nextTight][nextPrevious] += ways;
                    }
                }
            }
            dp = next;
        }
        return dp[0].reduce((sum, value) => sum + value, 0) + dp[1].reduce((sum, value) => sum + value, 0);
    }

    // Every count is at most 9e15 + 1, which is below Number.MAX_SAFE_INTEGER.
    return countUpTo(r) - countUpTo(l - 1);
}
