from typing import List
import heapq


class VideoSharingPlatform:
    def __init__(self):
        self.videos = {}
        self.free_ids = []

    def upload(self, video: str) -> int:
        if self.free_ids:
            video_id = heapq.heappop(self.free_ids)
        else:
            video_id = len(self.videos)
        self.videos[video_id] = [video, 0, 0, 0]
        return video_id

    def remove(self, videoId: int):
        if videoId in self.videos:
            del self.videos[videoId]
            heapq.heappush(self.free_ids, videoId)

    def watch(self, videoId: int, startMinute: int, endMinute: int) -> str:
        if videoId not in self.videos:
            return "-1"
        video = self.videos[videoId]
        video[3] += 1
        return video[0][startMinute : min(endMinute, len(video[0]) - 1) + 1]

    def like(self, videoId: int):
        if videoId in self.videos:
            self.videos[videoId][1] += 1

    def dislike(self, videoId: int):
        if videoId in self.videos:
            self.videos[videoId][2] += 1

    def getLikesAndDislikes(self, videoId: int) -> List[int]:
        if videoId not in self.videos:
            return [-1]
        video = self.videos[videoId]
        return [video[1], video[2]]

    def getViews(self, videoId: int) -> int:
        if videoId not in self.videos:
            return -1
        return self.videos[videoId][3]
