class VideoSharingPlatform {
    constructor() {}

    upload(video: string): number {}

    remove(videoId: number) {}

    watch(videoId: number, startMinute: number, endMinute: number): string {}

    like(videoId: number) {}

    dislike(videoId: number) {}

    getLikesAndDislikes(videoId: number): number[] {}

    getViews(videoId: number): number {}
}
