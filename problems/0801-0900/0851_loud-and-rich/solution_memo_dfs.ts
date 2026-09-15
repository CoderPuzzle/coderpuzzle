// Each pair [a, b] is an edge from a richer person to a poorer one, so the
// people definitely at least as rich as x are x plus all its ancestors in
// the DAG. A memoized DFS settles persons from the known-poorest upward:
// once every direct richer neighbor of x has settled, answer[x] folds in
// their answers, each of which already covers that neighbor's whole chain.
function loudAndRich(richer: number[][], quiet: number[]): number[] {
    const n = quiet.length;
    const richerOf: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of richer) {
        richerOf[b].push(a);
    }
    const answer: number[] = Array.from({ length: n }, (_, x) => x);
    const settled: boolean[] = new Array(n).fill(false);
    const stack: [number, number][] = [];
    for (let start = 0; start < n; ++start) {
        if (settled[start]) {
            continue;
        }
        stack.length = 0;
        stack.push([start, 0]);
        while (stack.length > 0) {
            const top = stack[stack.length - 1];
            const [x, i] = top;
            if (i < richerOf[x].length) {
                top[1] = i + 1;
                const a = richerOf[x][i];
                if (!settled[a]) {
                    stack.push([a, 0]);
                }
            } else {
                stack.pop();
                for (const a of richerOf[x]) {
                    if (quiet[answer[a]] < quiet[answer[x]]) {
                        answer[x] = answer[a];
                    }
                }
                settled[x] = true;
            }
        }
    }
    return answer;
}
