from typing import List


class Codec:
    """Counter-indexed tiny URLs: the object keeps every URL it has
    encoded, in order, and answers with "http://tinyurl.com/" plus the
    URL's 1-based position in that list written in lowercase base-36 —
    "1" for the first, "a" for the tenth, "10" for the 36th.
    """

    def __init__(self) -> None:
        self.urls: List[str] = []

    def encode(self, longUrl: str) -> str:
        self.urls.append(longUrl)
        digits = "0123456789abcdefghijklmnopqrstuvwxyz"
        # divmod yields the least-significant digit first, so each new
        # digit is prepended — the loop ends with the most significant.
        position = len(self.urls)
        suffix = ""
        while position > 0:
            position, remainder = divmod(position, 36)
            suffix = digits[remainder] + suffix
        return "http://tinyurl.com/" + suffix

    def decode(self, shortUrl: str) -> str:
        suffix = shortUrl[len("http://tinyurl.com/") :]
        return self.urls[int(suffix, 36) - 1]
