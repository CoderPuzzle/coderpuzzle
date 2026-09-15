import java.util.HashMap;
import java.util.Map;

class Cashier {

    // A product-to-price map plus a served-customer counter; every n-th
    // customer pays bill * (100 - discount) / 100.
    private final int n;
    private final int discount;
    private final Map<Integer, Integer> prices = new HashMap<>();
    private int customers = 0;

    public Cashier(int n, int discount, int[] products, int[] prices) {
        this.n = n;
        this.discount = discount;
        for (int i = 0; i < products.length; ++i) {
            this.prices.put(products[i], prices[i]);
        }
    }

    public double getBill(int[] product, int[] amount) {
        long bill = 0;
        for (int j = 0; j < product.length; ++j) {
            bill += (long) prices.get(product[j]) * amount[j];
        }
        ++customers;
        if (customers % n == 0) {
            return (bill * (100 - discount)) / 100.0;
        }
        return bill;
    }
}
