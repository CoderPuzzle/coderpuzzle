// Owner per node (-1 = unlocked) plus children adjacency built from the
// parent array; upgrade enumerates descendants with an explicit stack so
// a 2000-node chain is never recursed into.
class LockingTree {
    private parent: number[];
    private owner: number[];
    private children: number[][];

    constructor(parent: number[]) {
        this.parent = parent;
        this.owner = new Array(parent.length).fill(-1);
        this.children = parent.map(() => []);
        for (let node = 1; node < parent.length; ++node) {
            this.children[parent[node]].push(node);
        }
    }

    lock(num: number, user: number): boolean {
        if (this.owner[num] !== -1) return false;
        this.owner[num] = user;
        return true;
    }

    unlock(num: number, user: number): boolean {
        if (this.owner[num] !== user) return false;
        this.owner[num] = -1;
        return true;
    }

    upgrade(num: number, user: number): boolean {
        // Condition 1: the node itself must be unlocked.
        if (this.owner[num] !== -1) return false;
        // Condition 3: no ancestor may be locked.
        for (let node = this.parent[num]; node !== -1; node = this.parent[node]) {
            if (this.owner[node] !== -1) return false;
        }
        // Condition 2: at least one locked descendant. Collect every
        // descendant iteratively so the check and the later unlock share
        // one traversal.
        const descendants: number[] = [];
        const stack: number[] = [...this.children[num]];
        let hasLocked = false;
        while (stack.length > 0) {
            const node = stack.pop()!;
            descendants.push(node);
            if (this.owner[node] !== -1) hasLocked = true;
            stack.push(...this.children[node]);
        }
        if (!hasLocked) return false;
        this.owner[num] = user;
        for (const node of descendants) this.owner[node] = -1;
        return true;
    }
}
