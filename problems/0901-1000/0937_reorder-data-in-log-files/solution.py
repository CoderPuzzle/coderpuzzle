from typing import List, Optional


class Solution:
    def reorderLogFiles(self, logs: List[str]) -> List[str]:
        # Each letter entry carries (content, identifier, original log);
        # digit logs are set aside untouched.
        letter, digit = [], []
        for log in logs:
            space = log.index(" ")
            ident, content = log[:space], log[space + 1 :]
            # The content's first character classifies the log: a digit
            # makes it a digit-log, which the sort never touches.
            if content[0].isdigit():
                digit.append(log)
            else:
                letter.append((content, ident, log))
        # Letter-logs order by (content, identifier) — a total order, since
        # equal keys mean identical logs — then every digit-log follows in
        # its input position.
        letter.sort(key=lambda entry: (entry[0], entry[1]))
        return [log for _, _, log in letter] + digit
