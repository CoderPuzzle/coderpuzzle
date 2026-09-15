function deserialize(s: string): NestedInteger {
    if (s[0] !== "[") {
        const leaf = new NestedInteger();
        leaf.setInteger(Number(s));
        return leaf;
    }
    const stack: NestedInteger[] = [new NestedInteger()];
    let root: NestedInteger | null = null;
    let index = 1;
    while (index < s.length) {
        const ch = s[index];
        if (ch === "[") {
            stack.push(new NestedInteger());
            index += 1;
        } else if (ch === "]") {
            const node = stack.pop()!;
            if (stack.length > 0) stack[stack.length - 1].add(node);
            else root = node;
            index += 1;
        } else if (ch === ",") {
            index += 1;
        } else {
            const start = index;
            while (s[index] !== "," && s[index] !== "]") index += 1;
            const leaf = new NestedInteger();
            leaf.setInteger(Number(s.slice(start, index)));
            stack[stack.length - 1].add(leaf);
        }
    }
    return root!;
}
