class Solution:
    def hasMatch(self, s: str, p: str) -> bool:
        # Split at the star: the fixed prefix must occur somewhere and the
        # fixed suffix somewhere after it; the star absorbs whatever sits
        # between the two.
        star = p.index("*")
        pre, suf = p[:star], p[star + 1 :]
        first = s.find(pre)
        last = s.rfind(suf)
        return first != -1 and last != -1 and first + len(pre) <= last
