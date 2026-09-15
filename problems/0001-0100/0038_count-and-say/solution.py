class Solution:
    def countAndSay(self, n: int) -> str:
        # The first term is fixed; each later term is the run-length encoding
        # of the one before it, so n - 1 encoding passes reach the nth term.
        term = "1"
        for _ in range(n - 1):
            parts = []
            index = 0
            while index < len(term):
                # Measure the maximal run starting at index: the group the
                # encoder must emit as <count><digit>, then skip past it.
                run = 1
                while index + run < len(term) and term[index + run] == term[index]:
                    run += 1
                parts.append(str(run))
                parts.append(term[index])
                index += run
            term = "".join(parts)
        return term
