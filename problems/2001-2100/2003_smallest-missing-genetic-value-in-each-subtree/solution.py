from typing import List


class Solution:
    def smallestMissingValueSubtree(self, parents: List[int], nums: List[int]) -> List[int]:
        n = len(parents)
        children = [[] for _ in range(n)]
        one_node = -1
        for node in range(n):
            if parents[node] != -1:
                children[parents[node]].append(node)
            if nums[node] == 1:
                one_node = node

        answers = [1] * n
        if one_node == -1:
            return answers

        visited = [False] * n
        present = [False] * (n + 2)
        missing = 1
        ancestor = one_node
        while ancestor != -1:
            stack = [ancestor]
            while stack:
                node = stack.pop()
                if visited[node]:
                    continue
                visited[node] = True
                value = nums[node]
                if value < len(present):
                    present[value] = True
                stack.extend(children[node])
            while present[missing]:
                missing += 1
            answers[ancestor] = missing
            ancestor = parents[ancestor]
        return answers
