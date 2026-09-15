from typing import Dict


class Logger:
    """One map entry per message: the next timestamp it may print at.

    `shouldPrintMessage` checks that boundary in constant time; a print
    moves it ten seconds past the printing timestamp.
    """

    def __init__(self) -> None:
        self.next_allowed: Dict[str, int] = {}

    def shouldPrintMessage(self, timestamp: int, message: str) -> bool:
        allowed = self.next_allowed.get(message)
        if allowed is not None and timestamp < allowed:
            return False
        self.next_allowed[message] = timestamp + 10
        return True
