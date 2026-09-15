class Solution:
    def numTrees(self, n: int) -> int:
        # g[k] counts the BSTs on k ordered values. Picking value root as the
        # root leaves root - 1 smaller values for the left subtree and
        # k - root larger ones for the right; the two shape counts are
        # independent, so g[k] = sum over root of g[root-1] * g[k-root].
        g = [0] * (n + 1)
        g[0] = 1
        for nodes in range(1, n + 1):
            for root in range(1, nodes + 1):
                g[nodes] += g[root - 1] * g[nodes - root]
        return g[n]
