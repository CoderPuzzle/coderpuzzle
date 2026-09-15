class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        # Fix the source value v the operation converts into k (x = k - v).
        # A window then nets +1 for each v it captures and -1 for each k it
        # destroys, so the best window for v is the maximum-subarray run of
        # that score — reset to 0 when it dips negative, since choosing
        # x = 0 keeps the untouched baseline.
        base = nums.count(k)
        best = 0
        for v in range(1, 51):
            if v == k:
                continue
            run = 0
            for value in nums:
                if value == v:
                    run += 1
                elif value == k:
                    run -= 1
                if run < 0:
                    run = 0
                if run > best:
                    best = run
        return base + best
