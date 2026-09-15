from typing import List


class Solution:
    def countRatioSubarrays(self, nums: List[int], a: int, b: int) -> int:
        # Map even -> +b and odd -> -a. A subarray's transformed sum is
        # b*x - a*y, so by cross-multiplication sum <= 0 is exactly the
        # ratio condition x/y <= a/b; an all-even subarray has positive
        # sum, so y > 0 holds automatically on every counted pair.
        n = len(nums)
        pref = [0] * (n + 1)
        for i, value in enumerate(nums):
            pref[i + 1] = pref[i] + (b if value % 2 == 0 else -a)
        # Coordinate-compress the prefix values; duplicates share one slot
        # so that >= comparisons count them all.
        rank = {value: r for r, value in enumerate(sorted(set(pref)), start=1)}
        size = len(rank)
        tree = [0] * (size + 1)

        def update(i: int) -> None:
            while i <= size:
                tree[i] += 1
                i += i & -i

        def query(i: int) -> int:  # how many inserted prefixes have rank <= i
            total = 0
            while i > 0:
                total += tree[i]
                i -= i & -i
            return total

        answer = 0
        update(rank[pref[0]])
        seen = 1
        for m in range(1, n + 1):
            r = rank[pref[m]]
            # Subarray [m-1, k] for every earlier l = k with
            # pref[m] <= pref[l]: everything seen minus what is strictly below.
            answer += seen - query(r - 1)
            update(r)
            seen += 1
        return answer
