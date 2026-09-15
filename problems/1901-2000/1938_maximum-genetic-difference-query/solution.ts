function maxGeneticDifference(parents: number[], queries: number[][]): number[] {
    const BITS = 18;
    const n = parents.length;
    const children: number[][] = new Array(n);
    for (let i0 = 0; i0 < n; i0++) children[i0] = [];
    let root = -1;
    for (let i = 0; i < n; i++) {
        if (parents[i] === -1) root = i;
        else children[parents[i]].push(i);
    }

    const byNode: [number, number][][] = new Array(n);
    for (let b0 = 0; b0 < n; b0++) byNode[b0] = [];
    for (let idx = 0; idx < queries.length; idx++) {
        byNode[queries[idx][0]].push([queries[idx][1], idx]);
    }

    const ans: number[] = new Array(queries.length).fill(0);

    // trie stored as flat lists: children[bit] indices and subtree counts
    const nxt: number[][] = [[0, 0]];
    const count: number[] = [0];

    function insert(x: number, delta: number): void {
        let node = 0;
        count[node] += delta;
        for (let b = BITS - 1; b >= 0; b--) {
            const bit = (x >> b) & 1;
            if (nxt[node][bit] === 0) {
                nxt[node][bit] = nxt.length;
                nxt.push([0, 0]);
                count.push(0);
            }
            node = nxt[node][bit];
            count[node] += delta;
        }
    }

    function queryMax(x: number): number {
        let node = 0;
        let res = 0;
        for (let b = BITS - 1; b >= 0; b--) {
            const bit = (x >> b) & 1;
            const want = 1 - bit;
            const cand = nxt[node][want];
            if (cand !== 0 && count[cand] > 0) {
                res |= 1 << b;
                node = cand;
            } else {
                node = nxt[node][bit];
            }
        }
        return res;
    }

    const stack: [number, boolean][] = [[root, false]];
    while (stack.length > 0) {
        const [u, exiting] = stack.pop()!;
        if (exiting) {
            insert(u, -1);
            continue;
        }
        stack.push([u, true]);
        insert(u, 1);
        for (const [val, idx] of byNode[u]) {
            ans[idx] = queryMax(val);
        }
        for (const v of children[u]) {
            stack.push([v, false]);
        }
    }

    return ans;
}
