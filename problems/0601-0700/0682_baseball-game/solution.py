from typing import List


class Solution:
    def calPoints(self, operations: List[str]) -> int:
        # Every operation only ever touches the end of the record: a literal
        # pushes, the double and the sum read the last entry (or the last two)
        # and push, the cancel pops. Replaying the operations left to right on
        # a stack is therefore the whole computation, and the answer is the
        # sum of what is left — 0 when the record ends empty.
        record: List[int] = []
        for op in operations:
            if op == "C":
                record.pop()
            elif op == "D":
                record.append(2 * record[-1])
            elif op == "+":
                record.append(record[-1] + record[-2])
            else:
                record.append(int(op))
        return sum(record)
