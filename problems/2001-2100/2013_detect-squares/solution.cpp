class DetectSquares {
  public:
    DetectSquares() = default;

    void add(vector<int> point) { frequencies[encode(point[0], point[1])]++; }

    int count(vector<int> point) {
        int x = point[0];
        int y = point[1];
        long long total = 0;
        for (const auto &[key, horizontal] : frequencies) {
            int x2 = key / 1001;
            int y2 = key % 1001;
            if (y2 != y || x2 == x)
                continue;
            int distance = abs(x2 - x);
            total += (long long)horizontal * frequency(x, y + distance) * frequency(x2, y + distance);
            total += (long long)horizontal * frequency(x, y - distance) * frequency(x2, y - distance);
        }
        return (int)total;
    }

  private:
    unordered_map<int, int> frequencies;

    int frequency(int x, int y) const {
        if (y < 0 || y > 1000)
            return 0;
        auto found = frequencies.find(encode(x, y));
        return found == frequencies.end() ? 0 : found->second;
    }

    static int encode(int x, int y) { return x * 1001 + y; }
};
