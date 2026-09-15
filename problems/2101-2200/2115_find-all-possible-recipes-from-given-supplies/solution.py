from collections import deque
from typing import List, Optional


class Solution:
    def findAllRecipes(self, recipes: List[str], ingredients: List[List[str]], supplies: List[str]) -> List[str]:
        have = set(supplies)
        index = {name: i for i, name in enumerate(recipes)}
        n = len(recipes)
        dependents = [[] for _ in range(n)]
        indegree = [0] * n
        impossible = [False] * n
        for i, needed in enumerate(ingredients):
            seen = set()
            for item in needed:
                # An initial supply satisfies the requirement outright.
                if item in have:
                    continue
                j = index.get(item)
                if j is None:
                    # Neither supply nor recipe: this recipe can never be made.
                    impossible[i] = True
                elif j not in seen:
                    # Dedupe repeated ingredients so the indegree counts each
                    # recipe dependency once.
                    seen.add(j)
                    indegree[i] += 1
                    dependents[j].append(i)

        # Kahn's algorithm: recipes needing nothing beyond the supplies start
        # made; cycles never reach indegree zero and drop out automatically.
        queue = deque(i for i in range(n) if indegree[i] == 0 and not impossible[i])
        made = []
        while queue:
            i = queue.popleft()
            made.append(recipes[i])
            for j in dependents[i]:
                # Impossible recipes are skipped so their failure never
                # blocks or corrupts the rest.
                if impossible[j]:
                    continue
                indegree[j] -= 1
                if indegree[j] == 0:
                    queue.append(j)
        return sorted(made)
