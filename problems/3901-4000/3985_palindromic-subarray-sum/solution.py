class Solution:
    def getSum(self, nums: list[int]) -> int:
        n = len(nums)
        odd = [0] * n
        l = 0
        r = -1
        for i in range(n):
            k = 1 if i > r else min(odd[l + r - i], r - i + 1)
            while i - k >= 0 and i + k < n and nums[i - k] == nums[i + k]:
                k += 1
            odd[i] = k
            if i + k - 1 > r:
                l, r = i - k + 1, i + k - 1
        even = [0] * n
        l = 0
        r = -1
        for i in range(n):
            k = 0 if i > r else min(even[l + r - i + 1], r - i + 1)
            while i - k - 1 >= 0 and i + k < n and nums[i - k - 1] == nums[i + k]:
                k += 1
            even[i] = k
            if i + k - 1 > r:
                l, r = i - k, i + k - 1
        pref = [0]
        for x in nums:
            pref.append(pref[-1] + x)
        best = 0
        for i, k in enumerate(odd):
            best = max(best, pref[i + k] - pref[i - k + 1])
        for i, k in enumerate(even):
            best = max(best, pref[i + k] - pref[i - k])
        return best
