function minSwapsCouples(row: number[]): number {
    const n = row.length;
    const pos: number[] = new Array(n);
    for (let i = 0; i < n; i++) pos[row[i]] = i;

    const slots = n >> 1;
    const parent: number[] = new Array(slots);
    const size: number[] = new Array(slots).fill(1);
    for (let s = 0; s < slots; s++) parent[s] = s;

    const find = (a: number): number => {
        let root = a;
        while (parent[root] !== root) root = parent[root];
        while (parent[a] !== root) {
            // path compression: point every visited node at the root
            const next = parent[a];
            parent[a] = root;
            a = next;
        }
        return root;
    };

    let groups = slots;
    for (let v = 0; v < n; v += 2) {
        // each partner pair (v, v ^ 1) links its two slots
        const a = find(pos[v] >> 1);
        const b = find(pos[v ^ 1] >> 1);
        if (a === b) continue;
        if (size[a] < size[b]) {
            // union by size: hang the smaller tree under the larger
            parent[a] = b;
            size[b] += size[a];
        } else {
            parent[b] = a;
            size[a] += size[b];
        }
        groups -= 1;
    }
    return slots - groups;
}
