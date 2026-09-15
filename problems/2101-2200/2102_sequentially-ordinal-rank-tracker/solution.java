import java.util.PriorityQueue;

class SORTracker {

    private static class Location {

        String name;
        int score;

        Location(String name, int score) {
            this.name = name;
            this.score = score;
        }
    }

    private final PriorityQueue<Location> prefix;
    private final PriorityQueue<Location> remaining;

    public SORTracker() {
        prefix = new PriorityQueue<>((left, right) -> {
            int byScore = Integer.compare(left.score, right.score);
            return byScore != 0 ? byScore : right.name.compareTo(left.name);
        });
        remaining = new PriorityQueue<>((left, right) -> {
            int byScore = Integer.compare(right.score, left.score);
            return byScore != 0 ? byScore : left.name.compareTo(right.name);
        });
    }

    public void add(String name, int score) {
        prefix.offer(new Location(name, score));
        remaining.offer(prefix.poll());
    }

    public String get() {
        prefix.offer(remaining.poll());
        return prefix.peek().name;
    }
}
