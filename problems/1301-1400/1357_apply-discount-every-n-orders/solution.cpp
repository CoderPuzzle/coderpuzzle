#include <unordered_map>
#include <vector>

// A product-to-price map plus a served-customer counter; every n-th
// customer pays bill * (100 - discount) / 100.
class Cashier {
  public:
    Cashier(int n, int discount, std::vector<int> products, std::vector<int> prices) : n_(n), discount_(discount) {
        for (std::size_t i = 0; i < products.size(); ++i) {
            prices_[products[i]] = prices[i];
        }
    }

    double getBill(std::vector<int> product, std::vector<int> amount) {
        long long bill = 0;
        for (std::size_t j = 0; j < product.size(); ++j) {
            bill += (long long)prices_[product[j]] * amount[j];
        }
        ++customers_;
        if (customers_ % n_ == 0) {
            return bill * (100 - discount_) / 100.0;
        }
        return (double)bill;
    }

  private:
    int n_;
    int discount_;
    std::unordered_map<int, int> prices_;
    int customers_ = 0;
};
