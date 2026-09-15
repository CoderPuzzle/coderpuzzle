function getKthCharacter(root: string[], k: number): string {
    // Decode the level order: an entry of digits is an internal node, an
    // entry of letters is a leaf, and "" marks an absent child. Only
    // internal nodes occupy child slots, so only they join the queue.
    const n = root.length;
    const internal = root.map((e) => e !== "" && e.charCodeAt(0) >= 48 && e.charCodeAt(0) <= 57);
    const word = root.map((e, i) => (internal[i] ? "" : e));
    const left = new Array<number>(n).fill(-1);
    const right = new Array<number>(n).fill(-1);
    const queue = [0];
    for (let head = 0, i = 1; head < queue.length; head++) {
        const nd = queue[head];
        for (let slot = 0; slot < 2; slot++) {
            if (i >= n) {
                break;
            }
            const child = i++;
            if (root[child] === "") {
                continue;
            }
            if (slot === 0) {
                left[nd] = child;
            } else {
                right[nd] = child;
            }
            if (internal[child]) {
                queue.push(child);
            }
        }
    }
    // total[i] = length of S[i], computed bottom-up with an explicit
    // stack: a leaf contributes word length, an internal node the sum of
    // its children's totals.
    const total = new Array<number>(n).fill(0);
    const stack: Array<[number, boolean]> = [[0, false]];
    while (stack.length > 0) {
        const [nd, ready] = stack.pop()!;
        if (!internal[nd]) {
            total[nd] = word[nd].length;
        } else if (ready) {
            total[nd] = (left[nd] >= 0 ? total[left[nd]] : 0) + (right[nd] >= 0 ? total[right[nd]] : 0);
        } else {
            stack.push([nd, true]);
            for (const child of [right[nd], left[nd]]) {
                if (child >= 0) {
                    stack.push([child, false]);
                }
            }
        }
    }
    // Descend without ever building a string: the left subtree owns the
    // first total[left] characters, so k either falls inside it or shifts
    // past it into the right subtree.
    let nd = 0;
    while (internal[nd]) {
        const leftLen = left[nd] >= 0 ? total[left[nd]] : 0;
        if (k <= leftLen) {
            nd = left[nd];
        } else {
            k -= leftLen;
            nd = right[nd];
        }
    }
    return word[nd][k - 1];
}
