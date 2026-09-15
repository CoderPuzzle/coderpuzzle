function maxXor(n: number, edges: number[][], values: number[]): number {
    const graph: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        graph[a].push(b);
        graph[b].push(a);
    }

    // iterative DFS for order + parents
    const parent: number[] = new Array(n).fill(-1);
    const visited: boolean[] = new Array(n).fill(false);
    const order: number[] = [];
    visited[0] = true;
    const stack: number[] = [0];
    while (stack.length > 0) {
        const u = stack.pop()!;
        order.push(u);
        for (const v of graph[u]) {
            if (!visited[v]) {
                visited[v] = true;
                parent[v] = u;
                stack.push(v);
            }
        }
    }

    const sub: number[] = values.slice();
    for (let i = order.length - 1; i >= 0; i--) {
        const u = order[i];
        const p = parent[u];
        if (p !== -1) {
            sub[p] += sub[u];
        }
    }

    let maxSum = 1;
    for (const x of sub) {
        if (x > maxSum) {
            maxSum = x;
        }
    }
    let nbits = 0;
    let t = maxSum;
    while (t > 0) {
        t = Math.floor(t / 2);
        nbits++;
    }
    if (nbits === 0) {
        nbits = 1;
    }
    // powers of two as plain numbers (maxSum < 2^53 so this stays exact)
    const pow2: number[] = [];
    for (let b = 0; b <= nbits; b++) {
        pow2.push(Math.pow(2, b));
    }

    // flat trie: trie[node] = [child0, child1], -1 marks missing
    const trie: number[][] = [[-1, -1]];
    const trieInsert = (value: number): void => {
        let node = 0;
        for (let b = nbits - 1; b >= 0; b--) {
            const bit = Math.floor(value / pow2[b]) % 2;
            let nxt = trie[node][bit];
            if (nxt === -1) {
                nxt = trie.length;
                trie.push([-1, -1]);
                trie[node][bit] = nxt;
            }
            node = nxt;
        }
    };
    const trieQuery = (value: number): number => {
        let node = 0;
        let result = 0;
        for (let b = nbits - 1; b >= 0; b--) {
            const bit = Math.floor(value / pow2[b]) % 2;
            const want = 1 - bit;
            const kids = trie[node];
            if (kids[want] !== -1) {
                result += pow2[b];
                node = kids[want];
            } else {
                node = kids[bit];
            }
            if (node === -1) {
                return result;
            }
        }
        return result;
    };

    let answer = trieQuery(sub[0]);

    const ptr: number[] = new Array(n).fill(0);
    const stk: number[] = [0];
    const par: number[] = [-1];
    while (stk.length > 0) {
        const u = stk[stk.length - 1];
        const p = par[par.length - 1];
        if (ptr[u] < graph[u].length) {
            const v = graph[u][ptr[u]];
            ptr[u]++;
            if (v !== p) {
                const best = trieQuery(sub[v]);
                if (best > answer) {
                    answer = best;
                }
                stk.push(v);
                par.push(u);
            }
        } else {
            stk.pop();
            par.pop();
            trieInsert(sub[u]);
        }
    }
    return answer;
}
