class Solution:
    def minAddToMakeValid(self, s: str) -> int:
        # A move only inserts, so the answer is how many parentheses are
        # missing. One sweep keeps the count of '(' that no ')' has claimed:
        # a ')' consumes one when available, otherwise it is stranded —
        # nothing later in s can pair with it — and costs an inserted '('.
        # Unclaimed '(' at the end cost an inserted ')' each; both debts
        # are forced and sufficient.
        insertions = 0
        opened = 0
        for c in s:
            if c == "(":
                opened += 1
            elif opened > 0:
                opened -= 1
            else:
                insertions += 1
        return insertions + opened
