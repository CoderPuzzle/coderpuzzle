from collections import deque
from typing import List


class Solution:
    def getKthCharacter(self, root: List[str], k: int) -> str:
        # Decode the level order: an entry of digits is an internal node,
        # an entry of letters is a leaf, and "" marks an absent child. Only
        # internal nodes occupy child slots, so only they join the queue.
        internal = [e != "" and e[0].isdigit() for e in root]
        word = ["" if internal[i] else root[i] for i in range(len(root))]
        left, right = [-1] * len(root), [-1] * len(root)
        queue = deque([0])
        i = 1
        while queue:
            nd = queue.popleft()
            for slot in range(2):
                if i >= len(root):
                    break
                child = i
                i += 1
                if root[child] == "":
                    continue
                if slot == 0:
                    left[nd] = child
                else:
                    right[nd] = child
                if internal[child]:
                    queue.append(child)
        # total[i] = length of S[i], computed bottom-up with an explicit
        # stack: a leaf contributes len(word), an internal node the sum of
        # its children's totals.
        total = [0] * len(root)
        stack = [(0, False)]
        while stack:
            nd, ready = stack.pop()
            if not internal[nd]:
                total[nd] = len(word[nd])
            elif ready:
                total[nd] = (total[left[nd]] if left[nd] >= 0 else 0) + (total[right[nd]] if right[nd] >= 0 else 0)
            else:
                stack.append((nd, True))
                for child in (right[nd], left[nd]):
                    if child >= 0:
                        stack.append((child, False))
        # Descend without ever building a string: the left subtree owns
        # the first total[left] characters, so k either falls inside it or
        # shifts past it into the right subtree.
        nd = 0
        while internal[nd]:
            left_len = total[left[nd]] if left[nd] >= 0 else 0
            if k <= left_len:
                nd = left[nd]
            else:
                k -= left_len
                nd = right[nd]
        return word[nd][k - 1]
