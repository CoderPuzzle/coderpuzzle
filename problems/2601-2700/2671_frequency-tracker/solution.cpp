#include <unordered_map>

class FrequencyTracker {
  public:
    // Two counters kept in lockstep: number -> how many copies sit in the
    // structure, and frequency -> how many numbers currently occur that
    // often. Each add/delete moves one number between adjacent frequency
    // buckets, so any hasFrequency question becomes a single lookup.
    FrequencyTracker() {}

    void add(int number) {
        int count = count_of_[number]++;
        if (count > 0) {
            --numbers_at_[count];
        }
        ++numbers_at_[count + 1];
    }

    void deleteOne(int number) {
        int count = count_of_[number];
        // The structure may not contain it; delete nothing then.
        if (count == 0)
            return;
        --count_of_[number];
        --numbers_at_[count];
        if (count > 1) {
            ++numbers_at_[count - 1];
        }
    }

    bool hasFrequency(int frequency) {
        auto found = numbers_at_.find(frequency);
        return found != numbers_at_.end() && found->second > 0;
    }

  private:
    std::unordered_map<int, int> count_of_;
    std::unordered_map<int, int> numbers_at_;
};
