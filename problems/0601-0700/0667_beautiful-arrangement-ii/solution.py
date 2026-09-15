from typing import List


class Solution:
    def constructArray(self, n: int, k: int) -> List[int]:
        # The first k+1 slots alternate between the two ends of 1..k+1 —
        # 1, k+1, 2, k, 3, k-1, ... — so their adjacent differences walk
        # down k, k-1, ..., 1, each distinct value exactly once. The values
        # k+2..n then follow in ascending order: the junction difference
        # falls back inside 1..k and every later difference is 1, so the
        # k values already seen are the final count.
        answer = []
        low, high = 1, k + 1
        for i in range(k + 1):
            if i % 2 == 0:
                answer.append(low)
                low += 1
            else:
                answer.append(high)
                high -= 1
        answer.extend(range(k + 2, n + 1))
        return answer
