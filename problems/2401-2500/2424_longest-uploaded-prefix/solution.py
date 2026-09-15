class LUPrefix:
    """Uploaded marks in a boolean array plus a prefix pointer that only
    moves forward. upload() sets one mark; longest() advances the pointer
    while the next video is already uploaded. The pointer never retreats,
    so its total travel across all calls is bounded by n and every query
    is amortized constant.
    """

    def __init__(self, n: int):
        self.n = n
        self.uploaded = [False] * (n + 1)
        self.prefix = 0

    def upload(self, video: int):
        self.uploaded[video] = True

    def longest(self) -> int:
        while self.prefix < self.n and self.uploaded[self.prefix + 1]:
            self.prefix += 1
        return self.prefix
