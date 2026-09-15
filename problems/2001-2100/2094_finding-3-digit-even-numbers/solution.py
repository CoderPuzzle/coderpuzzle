from typing import List, Optional


class Solution:
    def findEvenNumbers(self, digits: List[int]) -> List[int]:
        available = [0] * 10
        for digit in digits:
            available[digit] += 1

        answer = []
        for number in range(100, 1000, 2):
            needed = [0] * 10
            needed[number // 100] += 1
            needed[number // 10 % 10] += 1
            needed[number % 10] += 1
            if all(needed[digit] <= available[digit] for digit in range(10)):
                answer.append(number)
        return answer
