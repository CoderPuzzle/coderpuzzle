// A skiplist: a stack of sorted singly-linked layers, each skipping over
// roughly half the elements below. add promotes a node to a random level
// (geometric, p = 1/2) and splices it into every layer it occupies;
// search/erase descend from the top layer, always moving to the rightmost
// node whose value stays below the target.
type SkiplistNode = { val: number; next: (SkiplistNode | null)[] };

class Skiplist {
    private static readonly MAX_LEVEL = 16;
    private head: SkiplistNode;

    constructor() {
        this.head = { val: -1, next: new Array(Skiplist.MAX_LEVEL).fill(null) };
    }

    private randomLevel(): number {
        let level = 1;
        while (Math.random() < 0.5 && level < Skiplist.MAX_LEVEL) {
            level++;
        }
        return level;
    }

    // The rightmost node strictly below target at each layer.
    private predecessors(target: number): (SkiplistNode | null)[] {
        const update: (SkiplistNode | null)[] = new Array(Skiplist.MAX_LEVEL).fill(null);
        let cur: SkiplistNode | null = this.head;
        for (let i = Skiplist.MAX_LEVEL - 1; i >= 0; --i) {
            while (cur.next[i] && cur.next[i].val < target) {
                cur = cur.next[i];
            }
            update[i] = cur;
        }
        return update;
    }

    search(target: number): boolean {
        let cur: SkiplistNode | null = this.head;
        for (let i = Skiplist.MAX_LEVEL - 1; i >= 0; --i) {
            while (cur.next[i] && cur.next[i].val < target) {
                cur = cur.next[i];
            }
        }
        cur = cur.next[0];
        return cur !== null && cur.val === target;
    }

    add(num: number): void {
        const update = this.predecessors(num);
        const level = this.randomLevel();
        const node: SkiplistNode = { val: num, next: new Array(level).fill(null) };
        // Splice into each layer the node actually occupies.
        for (let i = 0; i < level; ++i) {
            node.next[i] = update[i].next[i];
            update[i].next[i] = node;
        }
    }

    erase(num: number): boolean {
        const update = this.predecessors(num);
        const cur = update[0].next[0];
        if (cur === null || cur.val !== num) {
            return false;
        }
        // Unlink cur only where it is the immediate next node; at higher
        // layers a duplicate with more levels may take over.
        for (let i = 0; i < Skiplist.MAX_LEVEL; ++i) {
            if (update[i].next[i] === cur) {
                update[i].next[i] = cur.next[i];
            }
        }
        return true;
    }
}
