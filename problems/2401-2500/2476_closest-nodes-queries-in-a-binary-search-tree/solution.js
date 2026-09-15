/**
 * @param {TreeNode} root
 * @param {number[]} queries
 * @return {number[][]}
 */
var closestNodes = function (root, queries) {
    const values = [];
    const stack = [];
    let current = root;
    // A BST's inorder traversal is sorted: flatten once and each
    // query becomes two binary searches; the iterative walk dodges
    // recursion depth on a skewed tree.
    while (current || stack.length) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        values.push(current.val);
        current = current.right;
    }

    const bisectLeft = (target) => {
        let lo = 0;
        let hi = values.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (values[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };

    const answer = [];
    for (const query of queries) {
        // bisectLeft(query + 1) emulates bisect_right: one past the
        // last value <= query, so upper-1 is the largest such value.
        const lower = bisectLeft(query);
        const upper = bisectLeft(query + 1);
        // neighbours around the query slot: largest <= q and first >= q,
        // each -1 when that side is empty (a present query gives [q, q]).
        const minimum = upper > 0 ? values[upper - 1] : -1;
        const maximum = lower < values.length ? values[lower] : -1;
        answer.push([minimum, maximum]);
    }
    return answer;
};
