from typing import List, Optional


class Solution:
    def distributeCookies(self, cookies: List[int], k: int) -> int:
        best = [float("inf")]
        children = [0] * k

        def backtrack(i, cur_max):
            # bound pruning: the running max only grows, so this branch
            # can no longer beat the best complete distribution
            if cur_max >= best[0]:
                return
            # all bags placed: the running max is this leaf's unfairness
            if i == len(cookies):
                best[0] = cur_max
                return
            tried = set()
            for j in range(k):
                # symmetry: children holding equal totals are interchangeable,
                # so try each distinct total only once
                if children[j] in tried:
                    continue
                tried.add(children[j])
                children[j] += cookies[i]
                backtrack(i + 1, max(cur_max, children[j]))
                children[j] -= cookies[i]

        backtrack(0, 0)
        return best[0]
