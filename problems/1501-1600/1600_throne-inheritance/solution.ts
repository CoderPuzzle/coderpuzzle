class ThroneInheritance {
    // An n-ary tree keyed by name: children maps a name to its kids in
    // birth order, and dead holds everyone marked deceased. king is
    // remembered as the traversal root.
    private king: string;
    private children: Map<string, string[]>;
    private dead: Set<string>;

    constructor(kingName: string) {
        this.king = kingName;
        this.children = new Map([[kingName, []]]);
        this.dead = new Set();
    }

    birth(parentName: string, childName: string) {
        this.children.get(parentName)!.push(childName);
        this.children.set(childName, []);
    }

    death(name: string) {
        this.dead.add(name);
    }

    getInheritanceOrder(): string[] {
        // Iterative pre-order DFS (explicit stack, so depth never risks
        // the call stack — the tree can chain up to 1e5 generations
        // deep). Children go on the stack in reverse so the oldest child
        // is popped, and therefore visited, first.
        const order: string[] = [];
        const stack: string[] = [this.king];
        while (stack.length > 0) {
            const name = stack.pop()!;
            if (!this.dead.has(name)) {
                order.push(name);
            }
            const kids = this.children.get(name)!;
            for (let i = kids.length - 1; i >= 0; i--) {
                stack.push(kids[i]);
            }
        }
        return order;
    }
}
