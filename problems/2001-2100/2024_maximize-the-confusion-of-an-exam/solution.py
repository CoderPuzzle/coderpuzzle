from typing import List, Optional


class Solution:
    def maxConsecutiveAnswers(self, answerKey: str, k: int) -> int:
        # cnt tracks the T/F counts inside the window; a window can be made
        # uniform by flipping whichever character is currently the minority.
        cnt = {"T": 0, "F": 0}
        left = 0
        best = 0
        for right, ch in enumerate(answerKey):
            cnt[ch] += 1
            # Valid iff the minority count fits within the k flips — the min
            # covers both choices of final majority at once. Validity is
            # monotone in window size, so shrinking from the left alone
            # restores it.
            while min(cnt["T"], cnt["F"]) > k:
                cnt[answerKey[left]] -= 1
                left += 1
            best = max(best, right - left + 1)
        return best
