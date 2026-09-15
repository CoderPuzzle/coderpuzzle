class Solution:
    def cloneGraph(self, node):
        if node is None:
            return None
        clones = {node: GraphNode(node.val)}
        stack = [node]
        while stack:
            current = stack.pop()
            for neighbor in current.neighbors:
                if neighbor not in clones:
                    clones[neighbor] = GraphNode(neighbor.val)
                    stack.append(neighbor)
                clones[current].neighbors.append(clones[neighbor])
        return clones[node]
