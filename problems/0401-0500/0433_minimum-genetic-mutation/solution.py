from typing import List


class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
        # Already there: no character has to change, and no path through the
        # bank can beat zero mutations.
        if startGene == endGene:
            return 0
        # BFS over the mutation graph: genes are nodes, edges join genes that
        # differ in exactly one of the 8 characters, and every step after the
        # first must land on a bank entry.
        visited = {startGene}
        frontier = [startGene]
        depth = 0
        while frontier:
            depth += 1
            next_frontier = []
            for gene in frontier:
                for candidate in bank:
                    if candidate in visited:
                        continue
                    # One character changed = one mutation = one graph edge.
                    if sum(a != b for a, b in zip(gene, candidate)) == 1:
                        if candidate == endGene:
                            return depth
                        visited.add(candidate)
                        next_frontier.append(candidate)
            frontier = next_frontier
        return -1
