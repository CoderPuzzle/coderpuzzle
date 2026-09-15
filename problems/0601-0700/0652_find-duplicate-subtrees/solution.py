from typing import List, Optional


class Solution:
    def findDuplicateSubtrees(self, root: Optional[TreeNode]) -> List[Optional[TreeNode]]:
        info: dict = {}  # serial -> [first node, last preorder index, count]
        counter = [0]

        def key(node: Optional[TreeNode]) -> str:
            if node is None:
                return "#"
            index = counter[0]
            counter[0] += 1
            serial = f"{node.val},{key(node.left)},{key(node.right)}"
            if serial in info:
                entry = info[serial]
                entry[1] = index
                entry[2] += 1
            else:
                info[serial] = [node, index, 1]
            return serial

        key(root)
        duplicates = [entry[0] for entry in sorted(info.values(), key=lambda e: e[1]) if entry[2] >= 2]
        return duplicates
