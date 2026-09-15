function avoidFlood(rains: number[]): number[] {
    const n = rains.length;
    const nxt: number[] = new Array(n + 2);
    for (let i = 0; i < nxt.length; i++) {
        nxt[i] = i;
    }
    const find = (x: number): number => {
        let root = x;
        while (nxt[root] !== root) {
            root = nxt[root];
        }
        while (nxt[x] !== root) {
            const step = nxt[x];
            nxt[x] = root;
            x = step;
        }
        return root;
    };
    const last = new Map<number, number>();
    const ans: number[] = new Array(n).fill(-1);
    for (let i = 0; i < n; i++) {
        const r = rains[i];
        if (r === 0) {
            ans[i] = 1;
        } else {
            nxt[i] = i + 1;
            const prev = last.get(r);
            if (prev !== undefined) {
                const j = find(prev + 1);
                if (j >= i) {
                    return [];
                }
                ans[j] = r;
                nxt[j] = j + 1;
            }
            last.set(r, i);
        }
    }
    return ans;
}
