from typing import List, Optional


class VideoSharingPlatform:
    def __init__(self):
        raise NotImplementedError("TODO")

    def upload(self, video: str) -> int:
        raise NotImplementedError("TODO")

    def remove(self, videoId: int):
        raise NotImplementedError("TODO")

    def watch(self, videoId: int, startMinute: int, endMinute: int) -> str:
        raise NotImplementedError("TODO")

    def like(self, videoId: int):
        raise NotImplementedError("TODO")

    def dislike(self, videoId: int):
        raise NotImplementedError("TODO")

    def getLikesAndDislikes(self, videoId: int) -> List[int]:
        raise NotImplementedError("TODO")

    def getViews(self, videoId: int) -> int:
        raise NotImplementedError("TODO")
