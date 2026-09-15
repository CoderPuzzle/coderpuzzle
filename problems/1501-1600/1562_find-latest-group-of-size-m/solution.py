from typing import List


class Solution:
    def findLatestStep(self, arr: List[int], m: int) -> int:
        n = len(arr)
        # length[p] is meaningful only at the two ends of a 1-group: the
        # length of that group. Interior positions go stale once a group
        # grows past them, and are never read again.
        length = [0] * (n + 2)
        # count[k] = how many groups currently have length exactly k.
        count = [0] * (n + 1)
        ans = -1

        for step, pos in enumerate(arr, start=1):
            left = length[pos - 1]
            right = length[pos + 1]
            new_len = left + right + 1
            length[pos - left] = new_len
            length[pos + right] = new_len
            if left > 0:
                count[left] -= 1
            if right > 0:
                count[right] -= 1
            count[new_len] += 1
            if count[m] > 0:
                ans = step

        return ans
