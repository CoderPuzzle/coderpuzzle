from typing import Optional


class Solution:
    def balanceBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # phase 1: fold the tree into a descending "vine" — a left-only
        # chain in decreasing value order — via left rotations. A dummy
        # head lets the vine's own root be rotated without a special case.
        dummy = TreeNode(0)
        dummy.left = root
        tail, rest = dummy, dummy.left
        while rest:
            if rest.right:
                child = rest.right
                rest.right = child.left
                child.left = rest
                rest = child
                tail.left = child
            else:
                tail, rest = rest, rest.left

        size = 0
        node = dummy.left
        while node:
            size += 1
            node = node.left

        # phase 2: compress the vine into a complete tree with right
        # rotations, working from the leaves inward. The first round trims
        # the vine down to the largest 2**k - 1 size (its "extra" leaves);
        # every following round halves what remains, exactly like the
        # book DSW algorithm mirrored end for end.
        def compress(count: int) -> None:
            scanner = dummy
            for _ in range(count):
                child = scanner.left
                grandchild = child.left
                scanner.left = grandchild
                child.left = grandchild.right
                grandchild.right = child
                scanner = grandchild

        power = 1
        while power * 2 <= size + 1:
            power *= 2
        compress(size + 1 - power)
        size = power - 1
        while size > 1:
            compress(size // 2)
            size //= 2

        return dummy.left
