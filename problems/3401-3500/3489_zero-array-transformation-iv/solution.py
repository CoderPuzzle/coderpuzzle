class Solution:
    def minZeroArray(self, nums: List[int], queries: List[List[int]]) -> int:
        # Stream queries once; per index keep subset-sum reachability of
        # the vals seen so far (0/1 knapsack, one item per query) as a
        # bitmask over sums, and stop updating an index once its target
        # bit is set.
        n = len(nums)
        goal = []
        cap = []
        mask = []
        remaining = 0
        for t in nums:
            goal.append(1 << t)
            cap.append((1 << (t + 1)) - 1)
            mask.append(1)
            if t > 0:
                remaining += 1
        if remaining == 0:
            return 0
        for k, (l, r, val) in enumerate(queries):
            for i in range(l, r + 1):
                if mask[i] & goal[i] or val > nums[i]:
                    continue
                mask[i] = (mask[i] | (mask[i] << val)) & cap[i]
                if mask[i] & goal[i]:
                    remaining -= 1
            if remaining == 0:
                return k + 1
        return -1
