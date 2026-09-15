from typing import List


class Solution:
    def divideString(self, s: str, k: int, fill: str) -> List[str]:
        padding = (-len(s)) % k
        padded = s + fill * padding
        return [padded[start : start + k] for start in range(0, len(padded), k)]
