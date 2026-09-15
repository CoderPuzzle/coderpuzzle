from bisect import bisect_left


class Solution:
    def solveQueries(self, nums: List[int], queries: List[int]) -> List[int]:
        # Group indices by value; each occurrence list is sorted. Per
        # query, binary-search the list and take the nearer of the two
        # circular neighbors.
        pos = {}
        for i, v in enumerate(nums):
            pos.setdefault(v, []).append(i)
        n = len(nums)
        ans = []
        for q in queries:
            p = pos[nums[q]]
            if len(p) == 1:
                ans.append(-1)
                continue
            k = bisect_left(p, q)
            prev = p[k - 1] if k > 0 else p[-1]
            nxt = p[k + 1] if k + 1 < len(p) else p[0]
            dprev = (q - prev) % n
            dnxt = (nxt - q) % n
            ans.append(min(dprev, dnxt))
        return ans
