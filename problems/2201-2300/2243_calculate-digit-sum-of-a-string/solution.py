from typing import List


class Solution:
    def digitSum(self, s: str, k: int) -> str:
        while len(s) > k:
            groups = []
            for i in range(0, len(s), k):
                group = s[i : i + k]
                groups.append(str(sum(int(c) for c in group)))
            s = "".join(groups)
        return s
