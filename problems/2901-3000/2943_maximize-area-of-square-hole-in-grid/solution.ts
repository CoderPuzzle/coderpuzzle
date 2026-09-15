// Removing a run of t consecutive bars merges t+1 lines of cells into
// one span, so each axis contributes side = longest run + 1 and the
// square is limited by the smaller side. Only the bar lists matter —
// n and m only bound where bars may sit.
function maximizeSquareHoleArea(n: number, m: number, hBars: number[], vBars: number[]): number {
    const longestRun = (bars: number[]): number => {
        const sorted = [...bars].sort((a, b) => a - b);
        let best = 1;
        let cur = 1;
        for (let i = 1; i < sorted.length; ++i) {
            cur = sorted[i] === sorted[i - 1] + 1 ? cur + 1 : 1;
            if (cur > best) best = cur;
        }
        return best;
    };
    const side = Math.min(longestRun(hBars), longestRun(vBars)) + 1;
    return side * side;
}
