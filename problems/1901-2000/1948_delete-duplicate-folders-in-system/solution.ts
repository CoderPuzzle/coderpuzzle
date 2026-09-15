function deleteDuplicateFolder(paths: string[][]): string[][] {
    // trie nodes: children maps name -> node id; node 0 is the root
    const children: Map<string, number>[] = [new Map()];
    let nextId = 1;
    for (const path of paths) {
        let node = 0;
        for (const name of path) {
            let next = children[node].get(name);
            if (next === undefined) {
                children.push(new Map());
                next = nextId;
                children[node].set(name, next);
                nextId++;
            }
            node = next;
        }
    }
    const total = nextId;

    // collect all nodes (parents always appear before their children)
    const nodes: number[] = [];
    const stack: number[] = [0];
    while (stack.length > 0) {
        const u = stack.pop()!;
        nodes.push(u);
        for (const child of children[u].values()) {
            stack.push(child);
        }
    }

    // assign subtree signature ids in post-order (children before parents)
    const sigToId = new Map<string, number>();
    const sigCounts = new Map<number, number>();
    const nodeSig = new Array<number>(total);
    for (let ni = nodes.length - 1; ni >= 0; ni--) {
        const node = nodes[ni];
        const entries: [string, number][] = [];
        for (const [name, child] of children[node]) {
            entries.push([name, nodeSig[child]]);
        }
        entries.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
        let key = "";
        for (const [name, sid] of entries) {
            key += name + "" + sid + "";
        }
        let sid = sigToId.get(key);
        if (sid === undefined) {
            sid = sigToId.size;
            sigToId.set(key, sid);
        }
        nodeSig[node] = sid;
        sigCounts.set(sid, (sigCounts.get(sid) || 0) + 1);
    }

    const marked = new Array<boolean>(total).fill(false);
    for (const node of nodes) {
        if (children[node].size > 0 && (sigCounts.get(nodeSig[node]) || 0) >= 2) {
            const markStack = [node];
            while (markStack.length > 0) {
                const cur = markStack.pop()!;
                marked[cur] = true;
                for (const child of children[cur].values()) {
                    markStack.push(child);
                }
            }
        }
    }

    const result: string[][] = [];
    const collectStack: [number, string[]][] = [[0, []]];
    while (collectStack.length > 0) {
        const [u, prefix] = collectStack.pop()!;
        for (const [name, child] of children[u]) {
            if (marked[child]) continue;
            const newPath = prefix.concat([name]);
            result.push(newPath);
            collectStack.push([child, newPath]);
        }
    }
    result.sort((a, b) => {
        const len = Math.min(a.length, b.length);
        for (let i = 0; i < len; i++) {
            if (a[i] < b[i]) return -1;
            if (a[i] > b[i]) return 1;
        }
        return a.length - b.length;
    });
    return result;
}
