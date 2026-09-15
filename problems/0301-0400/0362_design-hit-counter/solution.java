import java.util.ArrayList;
import java.util.List;

class HitCounter {

    // Distinct timestamps with their hit counts, oldest first; getHits
    // drops everything at or before timestamp - 300 off the front and
    // sums what survives — the window is (timestamp - 300, timestamp].
    private final List<int[]> hits = new ArrayList<>();

    public HitCounter() {}

    public void hit(int timestamp) {
        if (!hits.isEmpty() && hits.get(hits.size() - 1)[0] == timestamp) {
            // Several hits may arrive at the same second; bumping the
            // newest count keeps one entry per distinct timestamp.
            hits.get(hits.size() - 1)[1]++;
        } else {
            hits.add(new int[] { timestamp, 1 });
        }
    }

    public int getHits(int timestamp) {
        int cutoff = timestamp - 300;
        while (!hits.isEmpty() && hits.get(0)[0] <= cutoff) {
            hits.remove(0);
        }
        int total = 0;
        for (int[] hit : hits) {
            total += hit[1];
        }
        return total;
    }
}
