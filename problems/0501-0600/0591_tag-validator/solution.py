from typing import List


class Solution:
    def isValid(self, code: str) -> bool:
        # One left-to-right scan with a stack of open tag names. The
        # outermost tag is special: it must open at position 0 and its end
        # tag must be the last thing in the string, so any content seen
        # while the stack is empty is an immediate rejection.
        stack: List[str] = []
        i, n = 0, len(code)
        while i < n:
            if code.startswith("<![CDATA[", i):
                # Cdata is legal only inside tag content, and its body runs
                # to the first "]]>" — everything between is opaque text.
                if not stack:
                    return False
                end = code.find("]]>", i)
                if end < 0:
                    return False
                i = end + 3
            elif code.startswith("</", i):
                # An end tag's name runs to the next ">"; it must equal the
                # most recently opened tag, or the nesting is unbalanced.
                if not stack:
                    return False
                j = code.find(">", i)
                if j < 0:
                    return False
                if code[i + 2 : j] != stack.pop():
                    return False
                if not stack and j != n - 1:
                    return False  # the outer tag closed, yet content remains
                i = j + 1
            elif code[i] == "<":
                # A start tag: parse the name to the next ">" and gate it
                # through the strict grammar before it enters the stack.
                j = code.find(">", i)
                if j < 0 or not self._tag_name(code[i + 1 : j]):
                    return False
                stack.append(code[i + 1 : j])
                i = j + 1
            elif not stack:
                return False  # plain text outside any tag
            else:
                i += 1
        return not stack

    def _tag_name(self, name: str) -> bool:
        # 1-9 characters, upper-case letters only.
        return 1 <= len(name) <= 9 and all("A" <= c <= "Z" for c in name)
