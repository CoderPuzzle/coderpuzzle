from typing import List


class Solution:
    def platesBetweenCandles(self, s: str, queries: List[List[int]]) -> List[int]:
        length = len(s)
        plate_prefix = [0] * (length + 1)
        left_nearest = [-1] * length
        nearest = -1
        for index, character in enumerate(s):
            plate_prefix[index + 1] = plate_prefix[index] + (character == "*")
            if character == "|":
                nearest = index
            left_nearest[index] = nearest

        right_nearest = [-1] * length
        nearest = -1
        for index in range(length - 1, -1, -1):
            if s[index] == "|":
                nearest = index
            right_nearest[index] = nearest

        answer = []
        for left, right in queries:
            left_candle = right_nearest[left]
            right_candle = left_nearest[right]
            if left_candle == -1 or right_candle == -1 or left_candle >= right_candle:
                answer.append(0)
            else:
                answer.append(plate_prefix[right_candle] - plate_prefix[left_candle])
        return answer
