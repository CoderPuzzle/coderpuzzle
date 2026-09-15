import java.util.ArrayList;
import java.util.List;

class RangeModule {

    // Tracked set as canonical disjoint intervals (parallel starts/ends):
    // the lists stay sorted and gap-separated, so a fully-tracked query is
    // always contained in a single stored interval.
    private final List<Integer> starts = new ArrayList<>();
    private final List<Integer> ends = new ArrayList<>();

    public RangeModule() {}

    public void addRange(int left, int right) {
        int i = lowerBound(ends, left); // first interval ending at/after left
        int j = upperBound(starts, right); // first interval starting after right
        if (i < j) {
            left = Math.min(left, starts.get(i));
            right = Math.max(right, ends.get(j - 1));
        }
        splice(starts, i, j, left);
        splice(ends, i, j, right);
    }

    public boolean queryRange(int left, int right) {
        int i = upperBound(starts, left) - 1; // last interval starting at/before left
        return i >= 0 && ends.get(i) >= right;
    }

    public void removeRange(int left, int right) {
        int i = upperBound(ends, left); // first interval ending after left
        int j = lowerBound(starts, right); // first interval starting at/after right
        List<Integer> newStarts = new ArrayList<>();
        List<Integer> newEnds = new ArrayList<>();
        if (i < j) {
            if (starts.get(i) < left) {
                newStarts.add(starts.get(i));
                newEnds.add(left);
            }
            if (ends.get(j - 1) > right) {
                newStarts.add(right);
                newEnds.add(ends.get(j - 1));
            }
        }
        replace(starts, i, j, newStarts);
        replace(ends, i, j, newEnds);
    }

    /** First index with values[index] >= target (bisect_left). */
    private static int lowerBound(List<Integer> values, int target) {
        int low = 0;
        int high = values.size();
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (values.get(mid) < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    /** First index with values[index] > target (bisect_right). */
    private static int upperBound(List<Integer> values, int target) {
        int low = 0;
        int high = values.size();
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (values.get(mid) <= target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    private static void splice(List<Integer> values, int from, int to, int value) {
        values.subList(from, to).clear();
        values.add(from, value);
    }

    private static void replace(List<Integer> values, int from, int to, List<Integer> replacement) {
        values.subList(from, to).clear();
        values.addAll(from, replacement);
    }
}
