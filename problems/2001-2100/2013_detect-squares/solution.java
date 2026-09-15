import java.util.HashMap;
import java.util.Map;

class DetectSquares {

    private final Map<Integer, Integer> frequencies = new HashMap<>();

    public DetectSquares() {}

    public void add(int[] point) {
        int key = encode(point[0], point[1]);
        frequencies.put(key, frequencies.getOrDefault(key, 0) + 1);
    }

    public int count(int[] point) {
        int x = point[0];
        int y = point[1];
        long total = 0;
        for (Map.Entry<Integer, Integer> entry : frequencies.entrySet()) {
            int x2 = entry.getKey() / 1001;
            int y2 = entry.getKey() % 1001;
            if (y2 != y || x2 == x) continue;
            int distance = Math.abs(x2 - x);
            total += (long) entry.getValue() * frequency(x, y + distance) * frequency(x2, y + distance);
            total += (long) entry.getValue() * frequency(x, y - distance) * frequency(x2, y - distance);
        }
        return (int) total;
    }

    private int frequency(int x, int y) {
        if (y < 0 || y > 1000) return 0;
        return frequencies.getOrDefault(encode(x, y), 0);
    }

    private int encode(int x, int y) {
        return x * 1001 + y;
    }
}
