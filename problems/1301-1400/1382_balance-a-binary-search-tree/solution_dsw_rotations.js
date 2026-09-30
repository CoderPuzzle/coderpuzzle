/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var balanceBST = function (root) {
    // phase 1: fold the tree into a descending "vine" — a left-only
    // chain in decreasing value order — via left rotations. A dummy
    // head lets the vine's own root be rotated without a special case.
    const dummy = new TreeNode(0);
    dummy.left = root;
    let tail = dummy;
    let rest = dummy.left;
    while (rest !== null) {
        if (rest.right !== null) {
            const child = rest.right;
            rest.right = child.left;
            child.left = rest;
            rest = child;
            tail.left = child;
        } else {
            tail = rest;
            rest = rest.left;
        }
    }

    let size = 0;
    for (let node = dummy.left; node !== null; node = node.left) {
        size++;
    }

    // phase 2: compress the vine into a complete tree with right
    // rotations, working from the leaves inward. The first round trims
    // the vine down to the largest 2**k - 1 size (its "extra" leaves);
    // every following round halves what remains, exactly like the book
    // DSW algorithm mirrored end for end.
    const compress = (count) => {
        let scanner = dummy;
        for (let i = 0; i < count; i++) {
            const child = scanner.left;
            const grandchild = child.left;
            scanner.left = grandchild;
            child.left = grandchild.right;
            grandchild.right = child;
            scanner = grandchild;
        }
    };

    let power = 1;
    while (power * 2 <= size + 1) {
        power *= 2;
    }
    compress(size + 1 - power);
    size = power - 1;
    while (size > 1) {
        compress(Math.floor(size / 2));
        size = Math.floor(size / 2);
    }

    return dummy.left;
};
