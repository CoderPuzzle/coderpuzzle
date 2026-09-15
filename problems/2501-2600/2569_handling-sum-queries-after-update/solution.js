/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[][]} queries
 * @return {number[]}
 */
var handleQuery = function (nums1, nums2, queries) {
    const n = nums1.length;
    // segment tree over nums1 with lazy range-flip
    const size = 4 * Math.max(1, n);
    const tree = new Array(size).fill(0);
    const lazy = new Array(size).fill(false);

    const build = (node, lo, hi, arr) => {
        if (lo === hi) {
            tree[node] = arr[lo];
            return;
        }
        const mid = Math.floor((lo + hi) / 2);
        build(node * 2, lo, mid, arr);
        build(node * 2 + 1, mid + 1, hi, arr);
        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    };
    const applyFlip = (node, lo, hi) => {
        tree[node] = hi - lo + 1 - tree[node];
        lazy[node] = !lazy[node];
    };
    const push = (node, lo, hi) => {
        if (lazy[node]) {
            const mid = Math.floor((lo + hi) / 2);
            applyFlip(node * 2, lo, mid);
            applyFlip(node * 2 + 1, mid + 1, hi);
            lazy[node] = false;
        }
    };
    const flip = (node, lo, hi, ql, qr) => {
        if (ql > hi || qr < lo) {
            return;
        }
        if (ql <= lo && hi <= qr) {
            applyFlip(node, lo, hi);
            return;
        }
        push(node, lo, hi);
        const mid = Math.floor((lo + hi) / 2);
        flip(node * 2, lo, mid, ql, qr);
        flip(node * 2 + 1, mid + 1, hi, ql, qr);
        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    };

    if (n > 0) {
        build(1, 0, n - 1, nums1);
    }
    let total = 0;
    for (const x of nums2) {
        total += x;
    }
    const answers = [];
    for (const q of queries) {
        const kind = q[0];
        if (kind === 1) {
            flip(1, 0, n - 1, q[1], q[2]);
        } else if (kind === 2) {
            total += q[1] * tree[1];
        } else {
            answers.push(total);
        }
    }
    return answers;
};
