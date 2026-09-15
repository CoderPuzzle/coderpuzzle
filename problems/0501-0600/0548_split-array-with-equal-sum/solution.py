from typing import List


class Solution:
    def splitArray(self, nums: List[int]) -> bool:
        # Fix the middle cut j: the four parts share one sum exactly when
        # some left split (0 < i < j - 1) balances — sum(0, i - 1) ==
        # sum(i + 1, j - 1) — and some right split (j + 1 < k < n - 1)
        # balances on the SAME value — sum(j + 1, k - 1) == sum(k + 1, n - 1).
        # Prefix sums turn every part into a difference of two table
        # entries: collect the balanced left values of this j in a set,
        # then scan k for a balanced right value already in the set.
        n = len(nums)
        prefix = [0] * (n + 1)
        for index, value in enumerate(nums):
            prefix[index + 1] = prefix[index] + value
        for j in range(3, n - 3):
            seen = set()
            for i in range(1, j - 1):
                if prefix[i] == prefix[j] - prefix[i + 1]:
                    seen.add(prefix[i])
            for k in range(j + 2, n - 1):
                if prefix[k] - prefix[j + 1] == prefix[n] - prefix[k + 1] and (prefix[k] - prefix[j + 1]) in seen:
                    return True
        return False
