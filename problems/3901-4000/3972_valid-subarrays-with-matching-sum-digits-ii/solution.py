from typing import List


class Solution:
    def countValidSubarrays(self, nums: List[int], x: int) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i, value in enumerate(nums):
            prefix[i + 1] = prefix[i] + value

        answer = 0
        # Window p covers sums whose first digit is x: [x*10**p, (x+1)*10**p-1].
        scale = 1
        for _ in range(16):
            lo = x * scale
            hi = (x + 1) * scale - 1
            scale *= 10
            if lo > prefix[n]:
                break
            left = 0
            entered = 0  # prefix indices [left, entered) are inside the window
            residue = [0] * 10
            for j in range(1, n + 1):
                floor = prefix[j] - hi
                ceiling = prefix[j] - lo
                while entered < j and prefix[entered] <= ceiling:
                    residue[prefix[entered] % 10] += 1
                    entered += 1
                while prefix[left] < floor:
                    residue[prefix[left] % 10] -= 1
                    left += 1
                answer += residue[(prefix[j] - x) % 10]
        return answer
