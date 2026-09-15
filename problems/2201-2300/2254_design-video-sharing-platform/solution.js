class VideoSharingPlatform {
    constructor() {
        this.videos = new Map();
        this.freeIds = [];
    }

    upload(video) {
        let id;
        if (this.freeIds.length > 0) {
            id = Math.min(...this.freeIds);
            this.freeIds.splice(this.freeIds.indexOf(id), 1);
        } else {
            id = this.videos.size;
        }
        this.videos.set(id, { content: video, likes: 0, dislikes: 0, views: 0 });
        return id;
    }

    remove(videoId) {
        if (this.videos.has(videoId)) {
            this.videos.delete(videoId);
            this.freeIds.push(videoId);
        }
    }

    watch(videoId, startMinute, endMinute) {
        const video = this.videos.get(videoId);
        if (!video) {
            return "-1";
        }
        video.views++;
        const end = Math.min(endMinute, video.content.length - 1);
        return video.content.slice(startMinute, end + 1);
    }

    like(videoId) {
        const video = this.videos.get(videoId);
        if (video) {
            video.likes++;
        }
    }

    dislike(videoId) {
        const video = this.videos.get(videoId);
        if (video) {
            video.dislikes++;
        }
    }

    getLikesAndDislikes(videoId) {
        const video = this.videos.get(videoId);
        if (!video) {
            return [-1];
        }
        return [video.likes, video.dislikes];
    }

    getViews(videoId) {
        const video = this.videos.get(videoId);
        if (!video) {
            return -1;
        }
        return video.views;
    }
}
