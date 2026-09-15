from typing import List


class Solution:
    def countValidSubsets(self, parent: List[int], nums: List[int], k: int) -> int:
        modulus = 1_000_000_007
        n = len(parent)
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[parent[i]].append(i)

        dp0 = [[0] * k for _ in range(n)]
        dp1 = [[0] * k for _ in range(n)]
        for node in range(n - 1, -1, -1):
            dp0[node][0] = 1
            dp1[node][nums[node] % k] = 1
            for child in children[node]:
                merged0 = [0] * k
                merged1 = [0] * k
                for r0 in range(k):
                    value0 = dp0[node][r0]
                    value1 = dp1[node][r0]
                    if value0 == 0 and value1 == 0:
                        continue
                    for r1 in range(k):
                        child_any = (dp0[child][r1] + dp1[child][r1]) % modulus
                        merged0[(r0 + r1) % k] = (merged0[(r0 + r1) % k] + value0 * child_any) % modulus
                        merged1[(r0 + r1) % k] = (merged1[(r0 + r1) % k] + value1 * dp0[child][r1]) % modulus
                dp0[node] = merged0
                dp1[node] = merged1

        return (dp0[0][0] + dp1[0][0] - 1) % modulus
