#include <unordered_map>
#include <vector>

class FreqStack {
  public:
    FreqStack() = default;

    void push(int val) {
        int frequency = freq[val] + 1;
        freq[val] = frequency;
        while ((int)groups.size() < frequency) {
            groups.emplace_back();
        }
        groups[frequency - 1].push_back(val);
        if (frequency > maxfreq) {
            maxfreq = frequency;
        }
    }

    int pop() {
        std::vector<int> &top = groups[maxfreq - 1];
        int val = top.back();
        top.pop_back();
        freq[val] = maxfreq - 1;
        if (top.empty()) {
            maxfreq--;
        }
        return val;
    }

  private:
    std::unordered_map<int, int> freq;
    std::vector<std::vector<int>> groups;
    int maxfreq = 0;
};
