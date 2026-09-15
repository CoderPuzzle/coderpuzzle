function finishTime(n: number, edges: number[][], baseTime: number[]): number {
    const children: number[][] = Array.from({ length: n }, () => []);
    for (const [parent, child] of edges) children[parent].push(child);
    const finish = new Array<number>(n).fill(0);
    for (let node = n - 1; node >= 0; node--) {
        if (children[node].length === 0) {
            finish[node] = baseTime[node];
            continue;
        }
        let earliest = Infinity;
        let latest = -Infinity;
        for (const child of children[node]) {
            earliest = Math.min(earliest, finish[child]);
            latest = Math.max(latest, finish[child]);
        }
        const ownDuration = latest - earliest + baseTime[node];
        finish[node] = latest + ownDuration;
    }
    return finish[0];
}
