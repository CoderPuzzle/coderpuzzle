#include <vector>

// A fixed ring buffer plus a running sum: next writes the incoming value
// over the window's oldest slot, folds the evicted value out of the sum
// and the new one in, and returns sum / count — the sum stays an exact
// integer and only the final step is a division.
class MovingAverage {
  public:
    MovingAverage(int size) : window(size, 0) {}

    double next(int val) {
        // The head slot holds the oldest value once the window is full;
        // before that the window is still filling and nothing evicts.
        if (count < (int)window.size()) {
            ++count;
        } else {
            total -= window[head];
        }
        window[head] = val;
        total += val;
        head = (head + 1) % (int)window.size();
        return (double)total / count;
    }

  private:
    std::vector<long long> window;
    long long total = 0;
    int head = 0;
    int count = 0;
};
