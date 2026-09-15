"""Problem-provided oracle (Master). Assembled into every
submission by the judge; never editable in the editor. This file
is the hidden implementation — solvers see only the public API
documented in the starter."""


class Master:
    """Oracle for 843 guess-the-word: guess(word) answers the number of
    matching positions; the secret must be found within the call budget
    (LeetCode allows 10)."""

    def __init__(self, wordlist: list[str], secret: str, budget: int):
        self.wordlist = wordlist
        self.secret = secret
        self.budget = budget
        self.calls = 0
        self.found = False

    def guess(self, word: str) -> int:
        if self.budget <= 0:
            raise RuntimeError("Master guess budget exhausted")
        self.budget -= 1
        self.calls += 1
        if word == self.secret:
            self.found = True
        return sum(a == b for a, b in zip(word, self.secret))

    def verdict(self) -> Any:
        return self.found
