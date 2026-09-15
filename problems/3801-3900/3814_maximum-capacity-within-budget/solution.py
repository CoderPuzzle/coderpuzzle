from bisect import bisect_left
from typing import List, Optional


class Solution:
    def maxCapacity(self, costs: List[int], capacity: List[int], budget: int) -> int:
        # Sort the machines by cost with capacities aligned; every
        # affordable pair is then reachable from its dearer machine with a
        # prefix of cheaper partners, so a prefix maximum of capacities
        # answers "best partner" in constant time per machine.
        machines = sorted(zip(costs, capacity))
        n = len(machines)
        sorted_costs = [cost for cost, _ in machines]
        pref_max = [0] * n
        run = 0
        for t, (_, cap) in enumerate(machines):
            run = max(run, cap)
            pref_max[t] = run
        # The empty selection costs 0 < budget (budget >= 1), so 0 is
        # always achievable and the answer only improves from there.
        # Partners are read only from indices before i, so a machine can
        # never pair with itself while every pair is still counted from
        # its dearer end.
        ans = 0
        for i, (cost, cap) in enumerate(machines):
            if cost < budget:
                ans = max(ans, cap)
            # Largest j with sorted_costs[j] < budget - cost.
            j = bisect_left(sorted_costs, budget - cost) - 1
            t = min(j, i - 1)
            if t >= 0:
                ans = max(ans, cap + pref_max[t])
        return ans
