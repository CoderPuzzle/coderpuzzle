function smallestMissingValueSubtree(parents: number[], nums: number[]): number[] {
    const n = parents.length;
    const children: number[][] = Array.from({ length: n }, () => []);
    let oneNode = -1;
    for (let node = 0; node < n; ++node) {
        if (parents[node] !== -1) {
            children[parents[node]].push(node);
        }
        if (nums[node] === 1) {
            oneNode = node;
        }
    }

    const answers = new Array<number>(n).fill(1);
    if (oneNode === -1) {
        return answers;
    }

    const visited = new Array<boolean>(n).fill(false);
    const present = new Array<boolean>(n + 2).fill(false);
    let missing = 1;
    for (let ancestor = oneNode; ancestor !== -1; ancestor = parents[ancestor]) {
        const stack = [ancestor];
        while (stack.length > 0) {
            const node = stack.pop()!;
            if (visited[node]) {
                continue;
            }
            visited[node] = true;
            if (nums[node] < present.length) {
                present[nums[node]] = true;
            }
            for (const child of children[node]) {
                stack.push(child);
            }
        }
        while (present[missing]) {
            ++missing;
        }
        answers[ancestor] = missing;
    }
    return answers;
}
