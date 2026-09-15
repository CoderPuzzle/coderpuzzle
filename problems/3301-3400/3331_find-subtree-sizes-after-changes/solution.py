class Solution:
    def findSubtreeSizes(self, parent: list[int], s: str) -> list[int]:
        n = len(parent)
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[parent[i]].append(i)

        # Iterative DFS from the root. last[c] is the closest ancestor of
        # the current node holding character c; entering v saves it on the
        # stack (paired with v) and the exit visit restores it, so last[]
        # always describes the current root-to-v path. The changes are
        # simultaneous and every rewiring points at an original ancestor,
        # so resolving each node against the original tree is exact.
        last = [-1] * 26
        newparent = [-1] * n
        pre = []
        stack = [(0, -2)]  # (node, ENTER)
        while stack:
            v, saved = stack.pop()
            c = ord(s[v]) - ord("a")
            if saved == -2:
                pre.append(v)
                newparent[v] = last[c] if last[c] != -1 else parent[v]
                stack.append((v, last[c]))
                last[c] = v
                for ch in children[v]:
                    stack.append((ch, -2))
            else:
                last[c] = saved

        # Each new parent precedes v in preorder, so consuming preorder in
        # reverse folds subtree sizes up the final tree in one pass.
        size = [1] * n
        for v in reversed(pre):
            p = newparent[v]
            if p >= 0:
                size[p] += size[v]
        return size
