class VideoSharingPlatform {
    private videos: Map<number, { content: string; likes: number; dislikes: number; views: number }>;
    private freeIds: number[];

    constructor() {
        this.videos = new Map();
        this.freeIds = [];
    }

    upload(video: string): number {
        let id: number;
        if (this.freeIds.length > 0) {
            id = Math.min(...this.freeIds);
            this.freeIds.splice(this.freeIds.indexOf(id), 1);
        } else {
            id = this.videos.size;
        }
        this.videos.set(id, { content: video, likes: 0, dislikes: 0, views: 0 });
        return id;
    }

    remove(videoId: number): void {
        if (this.videos.has(videoId)) {
            this.videos.delete(videoId);
            this.freeIds.push(videoId);
        }
    }

    watch(videoId: number, startMinute: number, endMinute: number): string {
        const video = this.videos.get(videoId);
        if (!video) {
            return "-1";
        }
        video.views++;
        const end = Math.min(endMinute, video.content.length - 1);
        return video.content.slice(startMinute, end + 1);
    }

    like(videoId: number): void {
        const video = this.videos.get(videoId);
        if (video) {
            video.likes++;
        }
    }

    dislike(videoId: number): void {
        const video = this.videos.get(videoId);
        if (video) {
            video.dislikes++;
        }
    }

    getLikesAndDislikes(videoId: number): number[] {
        const video = this.videos.get(videoId);
        if (!video) {
            return [-1];
        }
        return [video.likes, video.dislikes];
    }

    getViews(videoId: number): number {
        const video = this.videos.get(videoId);
        if (!video) {
            return -1;
        }
        return video.views;
    }
}
