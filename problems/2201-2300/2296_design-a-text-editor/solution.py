class TextEditor:
    """Two stacks split at the cursor: `left` holds the text before the
    cursor bottom-to-top, `right` the text after it nearest-char-on-top,
    so the characters adjacent to the cursor are always the two tops.
    """

    def __init__(self):
        self.left = []
        self.right = []

    def addText(self, text: str):
        self.left.extend(text)

    def deleteText(self, k: int) -> int:
        deleted = min(k, len(self.left))
        if deleted:
            del self.left[-deleted:]
        return deleted

    def cursorLeft(self, k: int) -> str:
        for _ in range(min(k, len(self.left))):
            self.right.append(self.left.pop())
        return "".join(self.left[-10:])

    def cursorRight(self, k: int) -> str:
        for _ in range(min(k, len(self.right))):
            self.left.append(self.right.pop())
        return "".join(self.left[-10:])
