function findAnswer(parent: number[], s: string): boolean[] {
    const n = parent.length;
    const children: number[][] = Array.from({ length: n }, () => []);
    for (let i = 1; i < n; i++) children[parent[i]].push(i);

    // Postorder tour of the whole tree: dfs(x) appends every subtree
    // string of x before s[x], so the subtree of node i is exactly the
    // tour segment of length size[i] ending at i's own position. The
    // stack version below visits children in decreasing order, whose
    // reverse is the required postorder (children increasing, node last).
    const pre: number[] = [];
    const stack: number[] = [0];
    while (stack.length > 0) {
        const v = stack.pop()!;
        pre.push(v);
        for (const c of children[v]) stack.push(c);
    }
    const tour: string[] = new Array(n);
    const pos: number[] = new Array(n).fill(0);
    const size: number[] = new Array(n).fill(1);
    for (let idx = 0; idx < n; idx++) {
        const v = pre[n - 1 - idx];
        tour[idx] = s[v];
        pos[v] = idx;
    }
    for (let idx = 0; idx < n; idx++) {
        const v = pre[n - 1 - idx];
        if (parent[v] >= 0) size[parent[v]] += size[v];
    }

    // Manacher's algorithm on the tour: p[i] is the palindrome radius at
    // center i of the '#' interleaving. A substring [l, r] is a palindrome
    // iff the radius at its transformed center l + r + 1 covers its full
    // length, so each node costs one comparison.
    const m = 2 * n + 1;
    const t: string[] = new Array(m).fill("#");
    for (let i = 0; i < n; i++) t[2 * i + 1] = tour[i];
    const p: number[] = new Array(m).fill(0);
    let center = 0;
    let right = 0;
    for (let i = 0; i < m; i++) {
        if (i < right) p[i] = Math.min(right - i, p[2 * center - i]);
        while (i - p[i] - 1 >= 0 && i + p[i] + 1 < m && t[i - p[i] - 1] === t[i + p[i] + 1]) {
            p[i]++;
        }
        if (i + p[i] > right) {
            center = i;
            right = i + p[i];
        }
    }

    const answer: boolean[] = new Array(n);
    for (let i = 0; i < n; i++) answer[i] = p[2 * pos[i] - size[i] + 2] >= size[i];
    return answer;
}
