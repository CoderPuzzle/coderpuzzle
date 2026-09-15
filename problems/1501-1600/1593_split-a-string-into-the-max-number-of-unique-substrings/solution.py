class Solution:
    def maxUniqueSplit(self, s: str) -> int:
        n = len(s)
        used = set()
        best = 0

        def walk(start: int, count: int) -> None:
            nonlocal best
            if start == n:
                best = max(best, count)
                return
            # count so far plus the (n - start) characters still left, each
            # contributing at most one more piece: a bound on what this
            # branch could still reach, cheap to check before it is explored.
            if count + (n - start) <= best:
                return
            for end in range(start + 1, n + 1):
                piece = s[start:end]
                if piece in used:
                    continue
                used.add(piece)
                walk(end, count + 1)
                # Undo so the next candidate length starts from the same
                # used-substring state as this one did.
                used.remove(piece)

        walk(0, 0)
        return best
