from collections import deque


class AuthenticationManager:
    """A FIFO queue of (tokenId, expiry) events plus a map of each token's
    current expiry. Call times strictly increase and an expiry is always
    currentTime + timeToLive, so every generate — and every fulfilled renew
    — appends the largest expiry seen so far to the tail; expiries grow
    along the queue. countUnexpiredTokens retires the front while it is
    stale (a renew superseded it) or expired, and then the map's size is
    the live count: nothing behind an unexpired front can be expired.
    """

    def __init__(self, timeToLive: int):
        self.time_to_live = timeToLive
        self.expiries = {}
        self.queue = deque()

    def generate(self, tokenId: str, currentTime: int):
        expiry = currentTime + self.time_to_live
        self.expiries[tokenId] = expiry
        self.queue.append((tokenId, expiry))

    def renew(self, tokenId: str, currentTime: int):
        expiry = self.expiries.get(tokenId)
        if expiry is not None and expiry > currentTime:
            expiry = currentTime + self.time_to_live
            self.expiries[tokenId] = expiry
            self.queue.append((tokenId, expiry))

    def countUnexpiredTokens(self, currentTime: int) -> int:
        expiries = self.expiries
        while self.queue:
            token_id, expiry = self.queue[0]
            if expiries.get(token_id) == expiry:
                if expiry > currentTime:
                    break
                del expiries[token_id]
            self.queue.popleft()
        return len(expiries)
