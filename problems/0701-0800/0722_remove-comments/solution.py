from typing import List


class Solution:
    def removeComments(self, source: List[str]) -> List[str]:
        # Each comment is decided by reading order — line by line, left to
        # right, first marker wins — so one pass with a single flag (inside a
        # block comment) and one buffer for the line under construction is the
        # whole computation. Entering or leaving a comment skips two
        # characters, so the closer of "/*/" never overlaps its opener. The
        # buffer flushes only when a line ends outside a block: an emptied
        # line is dropped, code before an opener joins code after its closer.
        result: List[str] = []
        buffer: List[str] = []
        in_block = False
        for line in source:
            i = 0
            while i < len(line):
                if in_block:
                    if line.startswith("*/", i):
                        in_block = False
                        i += 2
                    else:
                        i += 1
                elif line.startswith("//", i):
                    break
                elif line.startswith("/*", i):
                    in_block = True
                    i += 2
                else:
                    buffer.append(line[i])
                    i += 1
            if not in_block:
                if buffer:
                    result.append("".join(buffer))
                buffer = []
        return result
