/**
 * @param {TreeNode} root
 * @return {number}
 */
var longestConsecutive = function (root) {
    // Post-order, one pass: every node reports the pair of runs that
    // top out at it — the longest whose values step +1 downward away
    // from the node (inc) and the longest stepping -1 (dec). A child
    // valued exactly node.val + 1 extends inc with its own inc, one
    // valued node.val - 1 extends dec, and any other child extends
    // nothing. A valid path is monotone, so it turns at exactly one
    // node — the topmost node of the path, one arm descending into
    // each child subtree — and its length there is inc + dec - 1;
    // the answer is the maximum of that over all nodes. The traversal
    // carries its own stack of frames: the tree may be a single
    // 3*10^4-node chain, whose pass nests 30000 calls — past V8's
    // roughly one-megabyte default call stack.
    let best = 0;
    // An absent child is a run of length 0; a real run always has
    // inc >= 1, so the 0 flags it. Run = [inc, dec, value].
    const empty = [0, 0, 0];
    // Frame = [node, state, left run, right run]; state counts the
    // children still to visit: 0 = left pending, 1 = right pending,
    // 2 = ready to judge the node itself.
    const stack = [];
    if (root !== null) {
        stack.push([root, 0, empty, empty]);
    }
    while (stack.length > 0) {
        const frame = stack[stack.length - 1];
        if (frame[1] === 0) {
            frame[1] = 1;
            if (frame[0].left !== null) {
                stack.push([frame[0].left, 0, empty, empty]);
            }
        } else if (frame[1] === 1) {
            frame[1] = 2;
            if (frame[0].right !== null) {
                stack.push([frame[0].right, 0, empty, empty]);
            }
        } else {
            stack.pop();
            const value = frame[0].val;
            let inc = 1;
            let dec = 1;
            for (const child of [frame[2], frame[3]]) {
                // The child's value picks the run it extends; its
                // report says by how much.
                if (child[0] > 0) {
                    if (child[2] === value + 1 && child[0] + 1 > inc) {
                        inc = child[0] + 1;
                    }
                    if (child[2] === value - 1 && child[1] + 1 > dec) {
                        dec = child[1] + 1;
                    }
                }
            }
            if (inc + dec - 1 > best) {
                best = inc + dec - 1;
            }
            const report = [inc, dec, value];
            if (stack.length > 0) {
                const parent = stack[stack.length - 1];
                if (parent[1] === 1) {
                    parent[2] = report;
                } else {
                    parent[3] = report;
                }
            }
        }
    }
    return best;
};
