from typing import List


class Solution:
    def numberOfLines(self, widths: List[int], s: str) -> List[int]:
        # Only two numbers matter while the letters are written in order:
        # how wide the line being filled already is, and how many lines
        # have been started. A letter joins the current line when it keeps
        # the total within 100 pixels and opens the next line when it would
        # push past it, so a single left-to-right sweep over s ends holding
        # both answers: the line count and the last line's width.
        lines, current = 1, 0
        for ch in s:
            width = widths[ord(ch) - ord("a")]
            if current + width > 100:
                lines += 1
                current = width
            else:
                current += width
        return [lines, current]
