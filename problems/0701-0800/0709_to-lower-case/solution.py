class Solution:
    def toLowerCase(self, s: str) -> str:
        # ASCII puts every uppercase letter in 65..90 and its lowercase
        # twin 32 codes higher, so one pass decides each character:
        # inside the range, add 32; outside it, copy untouched. The
        # range check is what keeps the +32 from reaching digits,
        # punctuation, or already-lowercase letters.
        out = []
        for ch in s:
            code = ord(ch)
            if 65 <= code <= 90:
                ch = chr(code + 32)
            out.append(ch)
        return "".join(out)
