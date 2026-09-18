#include <vector>

class CustomStack {
  public:
    CustomStack(int maxSize) : values(maxSize), pending(maxSize, 0), size(0) {}

    void push(int x) {
        if (size < (int)values.size()) {
            values[size] = x;
            pending[size] = 0;
            size++;
        }
    }

    int pop() {
        if (size == 0) {
            return -1;
        }
        size--;
        long long increment = pending[size];
        if (size > 0) {
            pending[size - 1] += increment;
        }
        return (int)(values[size] + increment);
    }

    void increment(int k, int val) {
        int limit = k < (int)size ? k : (int)size;
        if (limit > 0) {
            pending[limit - 1] += val;
        }
    }

  private:
    std::vector<long long> values;
    std::vector<long long> pending;
    int size;
};
