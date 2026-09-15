from typing import List, Optional


class Solution:
    def minimumTimeRequired(self, jobs: List[int], k: int) -> int:
        n = len(jobs)
        # Largest jobs first: the biggest loads surface at the shallowest
        # levels, where the bound tightens soonest.
        jobs = sorted(jobs, reverse=True)
        # Pessimistic upper bound: everything on one worker.
        best = [sum(jobs)]
        loads = [0] * k

        def dfs(i):
            if i == n:
                # Every complete assignment is legal; keep its max load.
                current = max(loads)
                if current < best[0]:
                    best[0] = current
                return
            seen = set()
            for w in range(k):
                # A worker whose current load was already tried for this job
                # leads to an identical subproblem.
                if loads[w] in seen:
                    continue
                seen.add(loads[w])
                # Bound: this placement can no longer beat best.
                if loads[w] + jobs[i] >= best[0]:
                    continue
                loads[w] += jobs[i]
                dfs(i + 1)
                loads[w] -= jobs[i]
                # Empty workers are interchangeable — one trial suffices.
                if loads[w] == 0:
                    break

        dfs(0)
        return best[0]
