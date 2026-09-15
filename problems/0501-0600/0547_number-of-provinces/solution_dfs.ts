function findCircleNum(isConnected: number[][]): number {
    const n = isConnected.length;
    const visited = new Array<boolean>(n).fill(false);
    let provinces = 0;
    for (let start = 0; start < n; start++) {
        if (visited[start]) {
            continue;
        }
        // An unvisited city during the sweep starts a new component;
        // this one traversal absorbs exactly one province.
        provinces++;
        visited[start] = true;
        const stack: number[] = [start];
        while (stack.length > 0) {
            const city = stack.pop()!;
            for (let other = 0; other < n; other++) {
                if (isConnected[city][other] === 1 && !visited[other]) {
                    // Mark at push time so no city is stacked twice;
                    // membership is by visitation, so self-loops and the
                    // symmetric matrix never double count.
                    visited[other] = true;
                    stack.push(other);
                }
            }
        }
    }
    return provinces;
}
