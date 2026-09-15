from typing import List, Optional


class Solution:
    def maxPartitionsAfterOperations(self, s: str, k: int) -> int:
        # Sweep left to right carrying every segmentation state reachable
        # with the one allowed change unspent or already spent exactly
        # once. The unspent side is a single lineage (no change means the
        # greedy is forced); the spent side is a dict from open-window
        # letter mask to the best completed-partition count seen for it.
        # Equal masks merge on their best count because what happens next
        # depends only on the mask.
        base = ord("a")
        unspent_mask = 0
        unspent_count = 0
        spent = {}

        for ch in s:
            bit = 1 << (ord(ch) - base)

            # Advance every spent window on the real character: a new
            # letter with k distinct already present closes the open
            # partition; otherwise the letter joins the mask.
            nxt = {}
            for m, cnt in spent.items():
                if m & bit:
                    nm, nc = m, cnt
                elif m.bit_count() == k:
                    nm, nc = bit, cnt + 1
                else:
                    nm, nc = m | bit, cnt
                if nc > nxt.get(nm, -1):
                    nxt[nm] = nc

            # Spend the change right here: branch the twenty-five other
            # letters off the unspent lineage as of [0..i-1]; each branch
            # absorbs this very position, so it lands already advanced.
            for letter in range(26):
                branch = 1 << letter
                if branch == bit:
                    continue
                if unspent_mask & branch:
                    nm, nc = unspent_mask, unspent_count
                elif unspent_mask.bit_count() == k:
                    nm, nc = branch, unspent_count + 1
                else:
                    nm, nc = unspent_mask | branch, unspent_count
                if nc > nxt.get(nm, -1):
                    nxt[nm] = nc
            spent = nxt

            # Advance the unspent lineage on the real character.
            if not unspent_mask & bit:
                if unspent_mask.bit_count() == k:
                    unspent_count += 1
                    unspent_mask = bit
                else:
                    unspent_mask |= bit

        best = unspent_count
        for cnt in spent.values():
            if cnt > best:
                best = cnt
        return best + 1  # the final open partition always counts
