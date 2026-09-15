"""The hidden character source read through read4 (problem-provided oracle).

Ships with the problem, assembled into every submission's namespace by the
judge. `read4(buf4)` copies up to four pending characters into buf4 and
reports how many; the file never rewinds and the oracle tracks every
character the solution has consumed.
"""


class File:
    def __init__(self, content: list[str], budget: int):
        self.content = content
        self.budget = budget
        self.position = 0

    def read4(self, buf4: list) -> int:
        if self.budget <= 0:
            raise RuntimeError("Oracle query budget exhausted")
        self.budget -= 1
        count = min(4, len(self.content) - self.position)
        for index in range(count):
            buf4[index] = self.content[self.position + index]
        self.position += count
        return count
