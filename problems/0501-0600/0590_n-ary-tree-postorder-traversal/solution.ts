function postorder(root: Node | null): number[] {
    if (root === null) return [];
    const out: number[] = [];
    const stack: Array<[Node, number]> = [[root, 0]];
    while (stack.length > 0) {
        const frame = stack[stack.length - 1];
        const node = frame[0];
        if (frame[1] < node.children.length) {
            stack.push([node.children[frame[1]], 0]);
            frame[1] += 1;
        } else {
            out.push(node.val);
            stack.pop();
        }
    }
    return out;
}
