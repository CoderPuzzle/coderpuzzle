from typing import List


class Solution:
    def scoreOfStudents(self, s: str, answers: List[int]) -> int:
        correct = self.correct_value(s)
        numbers = [int(s[index]) for index in range(0, len(s), 2)]
        operators = [s[index] for index in range(1, len(s), 2)]
        size = len(numbers)
        dp = [[set() for _ in range(size)] for _ in range(size)]
        for index, value in enumerate(numbers):
            dp[index][index].add(value)

        for length in range(2, size + 1):
            for left in range(size - length + 1):
                right = left + length - 1
                for split in range(left, right):
                    for first in dp[left][split]:
                        for second in dp[split + 1][right]:
                            value = first + second if operators[split] == "+" else first * second
                            if value <= 1000:
                                dp[left][right].add(value)

        possible = dp[0][size - 1]
        score = 0
        for answer in answers:
            if answer == correct:
                score += 5
            elif answer in possible:
                score += 2
        return score

    def correct_value(self, expression: str) -> int:
        total = 0
        product = int(expression[0])
        for index in range(1, len(expression), 2):
            value = int(expression[index + 1])
            if expression[index] == "*":
                product *= value
            else:
                total += product
                product = value
        return total + product
