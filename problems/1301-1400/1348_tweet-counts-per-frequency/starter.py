from typing import List, Optional


class TweetCounts:
    def __init__(self):
        raise NotImplementedError("TODO")

    def recordTweet(self, tweetName: str, time: int):
        raise NotImplementedError("TODO")

    def getTweetCountsPerFrequency(self, freq: str, tweetName: str, startTime: int, endTime: int) -> List[int]:
        raise NotImplementedError("TODO")
