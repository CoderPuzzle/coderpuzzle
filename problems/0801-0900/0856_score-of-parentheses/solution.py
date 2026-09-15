class Solution:
    def scoreOfParentheses(self, s: str) -> int:
        # The rules only add siblings and double wrapped wholes, so every
        # score is a sum over "()" cores, each worth 2^d where d is the
        # number of pairs open around it. One sweep keeps the open-paren
        # depth; a ')' whose predecessor is '(' has just closed a core, and
        # the post-decrement depth counts its wrappers — add 1 << depth.
        score = 0
        depth = 0
        for i, c in enumerate(s):
            if c == "(":
                depth += 1
            else:
                depth -= 1
                if s[i - 1] == "(":
                    score += 1 << depth
        return score
