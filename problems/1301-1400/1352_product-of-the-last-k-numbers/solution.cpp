#include <vector>

class ProductOfNumbers {
  public:
    ProductOfNumbers() { prefix.push_back(1); }

    void add(int num) {
        if (num == 0) {
            prefix.resize(1);
            return;
        }
        prefix.push_back(prefix.back() * num);
    }

    int getProduct(int k) {
        if (k >= (int)prefix.size()) {
            return 0;
        }
        return (int)(prefix.back() / prefix[prefix.size() - 1 - k]);
    }

  private:
    std::vector<long long> prefix;
};
