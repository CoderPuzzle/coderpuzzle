from typing import List


class Solution:
    def circularArrayLoop(self, nums: List[int]) -> bool:
        n = len(nums)
        # Every index has exactly one successor, so each walk either closes
        # a loop or dies; 0 unseen, 1 on the current walk, 2 proven dead.
        state = [0] * n
        for start in range(n):
            if state[start]:
                continue
            path = []
            node = start
            while not state[node]:
                state[node] = 1
                path.append(node)
                nxt = (node + nums[node]) % n
                # A legal loop keeps one direction and more than one node,
                # so a sign flip or a hop back to self kills this chain.
                if nums[nxt] * nums[node] < 0 or nxt == node:
                    break
                node = nxt
                if state[node] == 1:
                    # Arrived back on this walk's own path: a legal loop.
                    return True
            for walked in path:
                state[walked] = 2
        return False
