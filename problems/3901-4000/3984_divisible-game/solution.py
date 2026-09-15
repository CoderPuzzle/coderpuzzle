from typing import List


class Solution:
    def divisibleGame(self, nums: List[int]) -> int:
        modulus = 1_000_000_007
        candidates = {2}
        for value in nums:
            divisor = 2
            while divisor * divisor <= value:
                if value % divisor == 0:
                    candidates.add(divisor)
                    candidates.add(value // divisor)
                divisor += 1
            if value > 1:
                candidates.add(value)

        best_score = -(10**30)
        best_k = 0
        for k in candidates:
            score = -(10**30)
            current = 0
            for value in nums:
                transformed = value if value % k == 0 else -value
                current = max(transformed, current + transformed)
                score = max(score, current)
            if score > best_score or (score == best_score and k < best_k):
                best_score = score
                best_k = k
        return (best_score % modulus) * best_k % modulus
