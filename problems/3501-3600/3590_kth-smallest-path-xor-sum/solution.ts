// Path XOR root -> node, then bottom-up small-to-large merging of sorted
// distinct XOR lists: a subtree's list is its largest child's list
// (reused) grown by the node's own value and every other child's distinct
// values, so each element only moves into lists that keep doubling. A
// small child (under 64 values) splices element-by-element — binary
// search plus one contiguous insert — while a large child folds in with a
// single two-pointer pass that dedupes as it goes. Queries are grouped by
// node and answered by indexing the final list at k - 1, or -1 past the
// end. The tree can be a 5 * 10^4-node chain, so the DFS is an explicit
// stack.
function kthSmallest(par: number[], vals: number[], queries: number[][]): number[] {
    const n = vals.length;
    const children: number[][] = Array.from({ length: n }, () => []);
    for (let node = 1; node < n; node++) children[par[node]].push(node);
    const order: number[] = []; // preorder: every parent precedes its children
    const path: number[] = new Array(n).fill(0);
    const stack: number[] = [0];
    while (stack.length) {
        const node = stack.pop()!;
        order.push(node);
        path[node] = vals[node] ^ (node ? path[par[node]] : 0);
        for (const child of children[node]) stack.push(child);
    }
    const byNode = new Map<number, number[][]>(); // node -> [[k, query index]]
    queries.forEach(([u, k], j) => {
        if (!byNode.has(u)) byNode.set(u, []);
        byNode.get(u)!.push([k, j]);
    });
    const answers: number[] = new Array(queries.length).fill(0);
    const lists: number[][] = new Array(n);
    const lowerBound = (arr: number[], value: number): number => {
        let lo = 0;
        let hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] < value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    for (let t = n - 1; t >= 0; t--) {
        const node = order[t];
        const kids = children[node];
        let base = -1;
        for (const child of kids) {
            if (base < 0 || lists[child].length > lists[base].length) base = child;
        }
        let acc: number[] = base >= 0 ? lists[base] : [];
        const own = path[node];
        const ownPos = lowerBound(acc, own);
        if (ownPos === acc.length || acc[ownPos] !== own) acc.splice(ownPos, 0, own);
        for (const child of kids) {
            if (child === base) continue;
            const small = lists[child];
            if (small.length >= 64) {
                const merged: number[] = []; // two-pointer pass, deduping
                let i = 0;
                let j = 0;
                while (i < acc.length && j < small.length) {
                    if (acc[i] < small[j]) merged.push(acc[i++]);
                    else if (small[j] < acc[i]) merged.push(small[j++]);
                    else {
                        merged.push(acc[i++]);
                        j++;
                    }
                }
                while (i < acc.length) merged.push(acc[i++]);
                while (j < small.length) merged.push(small[j++]);
                acc = merged;
            } else {
                for (const value of small) {
                    const pos = lowerBound(acc, value);
                    if (pos === acc.length || acc[pos] !== value) acc.splice(pos, 0, value);
                }
            }
        }
        lists[node] = acc;
        for (const [k, j] of byNode.get(node) || []) {
            answers[j] = k <= acc.length ? acc[k - 1] : -1;
        }
    }
    return answers;
}
