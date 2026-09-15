import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;

class Twitter {

    // Per-user chronological tweet lists (newest last) plus follow sets. The
    // feed merges the last 10 tweets of each source with a size-10 min-heap
    // keyed on the global timestamp.
    private final Map<Integer, List<int[]>> posts = new HashMap<>(); // user -> [time, id]
    private final Map<Integer, Set<Integer>> following = new HashMap<>();
    private int clock;

    public Twitter() {}

    public void postTweet(int userId, int tweetId) {
        posts.computeIfAbsent(userId, key -> new ArrayList<>()).add(new int[] { clock, tweetId });
        clock++;
    }

    public List<Integer> getNewsFeed(int userId) {
        Set<Integer> sources = new HashSet<>();
        sources.add(userId);
        sources.addAll(following.getOrDefault(userId, Set.of()));
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        for (int source : sources) {
            List<int[]> timeline = posts.get(source);
            if (timeline == null) {
                continue;
            }
            for (int index = Math.max(0, timeline.size() - 10); index < timeline.size(); index++) {
                heap.offer(timeline.get(index));
                if (heap.size() > 10) {
                    heap.poll();
                }
            }
        }
        int[] taken = new int[heap.size()];
        for (int index = taken.length - 1; index >= 0; index--) {
            taken[index] = heap.poll()[1];
        }
        List<Integer> feed = new ArrayList<>(taken.length);
        for (int tweetId : taken) {
            feed.add(tweetId);
        }
        return feed;
    }

    public void follow(int followerId, int followeeId) {
        following.computeIfAbsent(followerId, key -> new HashSet<>()).add(followeeId);
    }

    public void unfollow(int followerId, int followeeId) {
        Set<Integer> set = following.get(followerId);
        if (set != null) {
            set.remove(followeeId);
        }
    }
}
