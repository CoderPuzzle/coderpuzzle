class Solution:
    def isValidSerialization(self, preorder: str) -> bool:
        # slots counts tree positions still waiting to be filled — one for the
        # root at the start. Each token fills one slot; a number then opens two
        # more for its children, a '#' opens none. The serialization is valid
        # exactly when no token arrives after the slots run out and the last
        # token closes the last one, so no tree is ever built.
        slots = 1
        i, n = 0, len(preorder)
        while i < n:
            # A token with no open slot has nowhere to live: the tree this
            # string describes was already finished earlier.
            if slots == 0:
                return False
            slots -= 1
            # Only the first character of a token matters: a valid token is
            # either a number or the one-character '#'.
            is_null = preorder[i] == "#"
            while i < n and preorder[i] != ",":
                i += 1
            i += 1  # step past the comma (harmless past the last token)
            if not is_null:
                slots += 2
        return slots == 0
