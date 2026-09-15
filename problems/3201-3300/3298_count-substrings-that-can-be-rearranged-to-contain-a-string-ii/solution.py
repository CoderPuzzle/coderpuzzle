class Solution:
    def validSubstringCount(self, word1: str, word2: str) -> int:
        # A window is valid exactly when its counts cover word2's counts.
        # Track how many required characters are still `missing`; when it
        # hits zero every extension r' >= r of the current right end works,
        # contributing n - r windows for this left end. The minimal right
        # end never decreases as l advances, so each character enters and
        # leaves the window once — linear overall.
        n = len(word1)
        need = [0] * 26
        for ch in word2:
            need[ord(ch) - 97] += 1
        missing = sum(need)
        have = [0] * 26
        total = 0
        r = 0
        for l in range(n):
            # Grow the window until it first covers word2.
            while r < n and missing > 0:
                c = ord(word1[r]) - 97
                have[c] += 1
                if need[c] > 0 and have[c] <= need[c]:
                    missing -= 1
                r += 1
            if missing > 0:
                # No window starting at l (or any later l) can cover word2.
                break
            total += n - (r - 1)
            # Drop word1[l] before moving to the next left end.
            c = ord(word1[l]) - 97
            have[c] -= 1
            if need[c] > 0 and have[c] < need[c]:
                missing += 1
        return total
