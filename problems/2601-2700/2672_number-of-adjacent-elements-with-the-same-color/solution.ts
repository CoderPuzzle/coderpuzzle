function colorTheArray(n: number, queries: number[][]): number[] {
    // Only the painted cell's two neighbor pairs can flip status in one
    // query: score their contribution before the repaint, then after, and
    // slide the running total by the difference. Zero stays "uncolored",
    // so a pair only counts when both sides are non-zero and equal.
    const colors: number[] = new Array(n).fill(0);
    let same = 0;
    const answer: number[] = [];
    for (const [index, color] of queries) {
        for (const j of [index - 1, index + 1]) {
            if (j >= 0 && j < n && colors[j] !== 0 && colors[j] === colors[index]) {
                same--;
            }
        }
        colors[index] = color;
        for (const j of [index - 1, index + 1]) {
            if (j >= 0 && j < n && colors[j] !== 0 && colors[j] === color) {
                same++;
            }
        }
        answer.push(same);
    }
    return answer;
}
