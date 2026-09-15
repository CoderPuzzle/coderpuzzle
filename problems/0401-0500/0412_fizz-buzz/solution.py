from typing import List


class Solution:
    def fizzBuzz(self, n: int) -> List[str]:
        answer: List[str] = []
        for i in range(1, n + 1):
            # Each divisor appends its own word, so "FizzBuzz" emerges from
            # both checks passing and an empty build falls back to the
            # number itself — no branch ever enumerates all four cases.
            entry = ""
            if i % 3 == 0:
                entry += "Fizz"
            if i % 5 == 0:
                entry += "Buzz"
            if entry:
                answer.append(entry)
            else:
                answer.append(str(i))
        return answer
