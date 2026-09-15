class Solution:
    def minimumDeletions(self, s: str) -> int:
        # Cost of putting the a/b boundary right before index 0: delete
        # every 'a' (the whole string would sit in the b-region).
        cost = s.count("a")
        best = cost
        # Slide the boundary one character right at a time. Passing an
        # 'a' removes it from the future deletion cost; passing a 'b'
        # adds it, since it now sits left of the boundary.
        for ch in s:
            if ch == "a":
                cost -= 1
            else:
                cost += 1
            best = min(best, cost)
        return best
