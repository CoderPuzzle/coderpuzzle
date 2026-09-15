class Solution:
    def phonePrefix(self, numbers: List[str]) -> bool:
        # In sorted order a prefix relationship must surface between
        # neighbors: the shorter prefix sorts first, and anything
        # landing between them shares that prefix as well.
        s = sorted(numbers)
        return all(not b.startswith(a) for a, b in zip(s, s[1:]))
