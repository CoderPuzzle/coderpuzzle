class Solution:
    def heightOfTree(self, root):
        # A leaf of the special tree is the one node the display cannot
        # mark: the ring gives every leaf both children, and the previous
        # leaf's right child points back at the leaf itself. A wave only
        # descends from the nodes the test clears, so the ring never
        # joins a wave and every reached node is visited once.
        frontier = [] if root is None else [root]
        height = 0
        while True:
            wave = []
            for node in frontier:
                if node.left is not None and node.left.right is node:
                    continue
                if node.left is not None:
                    wave.append(node.left)
                if node.right is not None:
                    wave.append(node.right)
            if not wave:
                return height
            height += 1
            frontier = wave
