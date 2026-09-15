from typing import List


class Solution:
    def maxValue(self, nums1: List[int], nums0: List[int]) -> int:
        def key(segment: tuple[int, int]) -> tuple[int, int, int]:
            ones, zeros = segment
            if zeros == 0:
                return (0, 0, 0)
            if ones == 0:
                return (2, 0, 0)
            return (1, -ones, zeros)

        segments = sorted(zip(nums1, nums0), key=key)
        answer = 0
        modulus = 1_000_000_007
        for ones, zeros in segments:
            for _ in range(ones):
                answer = (answer * 2 + 1) % modulus
            for _ in range(zeros):
                answer = answer * 2 % modulus
        return answer
