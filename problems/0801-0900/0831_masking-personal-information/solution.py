from typing import List, Optional


class Solution:
    def maskPII(self, s: str) -> str:
        # The '@' sign only appears in emails, so finding it settles
        # which of the two shapes the input is. An email answer keeps
        # the name's first and last letters and everything from the '@'
        # on, folds uppercase to lowercase by adding 32, and pins the
        # name's middle to five asterisks; the name is at least two
        # letters, so even "ab" wears the full five. A phone answer
        # needs only the digits: ten of them form the bare local number,
        # and each digit beyond ten contributes one masked asterisk
        # behind a '+', ahead of the shared "***-***-" tail and the
        # last four digits.
        at = s.find("@")
        out = []
        if at >= 0:
            for i, ch in enumerate(s):
                # Position 1 opens the fixed five-asterisk middle; the
                # name's first and last letters and the whole domain
                # are the only characters kept.
                if i == 1:
                    out.append("*****")
                if i == 0 or i >= at - 1:
                    code = ord(ch)
                    if 65 <= code <= 90:
                        ch = chr(code + 32)
                    out.append(ch)
        else:
            digits = []
            for ch in s:
                code = ord(ch)
                if 48 <= code <= 57:
                    digits.append(ch)
            # Every digit past ten is one masked country-code star.
            if len(digits) > 10:
                out.append("+" + "*" * (len(digits) - 10) + "-")
            out.append("***-***-")
            out.extend(digits[-4:])
        return "".join(out)
