import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class VideoSharingPlatform {

    private static class Video {

        String content;
        long likes;
        long dislikes;
        long views;

        Video(String content) {
            this.content = content;
        }
    }

    private final Map<Integer, Video> videos = new HashMap<>();
    private final PriorityQueue<Integer> freeIds = new PriorityQueue<>();

    public VideoSharingPlatform() {}

    public int upload(String video) {
        int id;
        if (!freeIds.isEmpty()) {
            id = freeIds.poll();
        } else {
            id = videos.size();
        }
        videos.put(id, new Video(video));
        return id;
    }

    public void remove(int videoId) {
        if (videos.remove(videoId) != null) {
            freeIds.add(videoId);
        }
    }

    public String watch(int videoId, int startMinute, int endMinute) {
        Video video = videos.get(videoId);
        if (video == null) {
            return "-1";
        }
        video.views++;
        int end = Math.min(endMinute, video.content.length() - 1);
        return video.content.substring(startMinute, end + 1);
    }

    public void like(int videoId) {
        Video video = videos.get(videoId);
        if (video != null) {
            video.likes++;
        }
    }

    public void dislike(int videoId) {
        Video video = videos.get(videoId);
        if (video != null) {
            video.dislikes++;
        }
    }

    public int[] getLikesAndDislikes(int videoId) {
        Video video = videos.get(videoId);
        if (video == null) {
            return new int[] { -1 };
        }
        return new int[] { (int) video.likes, (int) video.dislikes };
    }

    public int getViews(int videoId) {
        Video video = videos.get(videoId);
        if (video == null) {
            return -1;
        }
        return (int) video.views;
    }
}
