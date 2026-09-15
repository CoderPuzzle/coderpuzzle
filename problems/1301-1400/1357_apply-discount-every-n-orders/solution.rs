use std::collections::HashMap;

// A product-to-price map plus a served-customer counter; every n-th
// customer pays bill * (100 - discount) / 100.
pub struct Cashier {
    n: i32,
    discount: i32,
    prices: HashMap<i32, i32>,
    customers: i32,
}

impl Cashier {
    pub fn new(n: i32, discount: i32, products: Vec<i32>, prices: Vec<i32>) -> Self {
        let mut catalog = HashMap::with_capacity(products.len());
        for (id, price) in products.into_iter().zip(prices.into_iter()) {
            catalog.insert(id, price);
        }
        Cashier {
            n,
            discount,
            prices: catalog,
            customers: 0,
        }
    }

    pub fn get_bill(&mut self, product: Vec<i32>, amount: Vec<i32>) -> f64 {
        let mut bill: i64 = 0;
        for (id, count) in product.into_iter().zip(amount.into_iter()) {
            bill += self.prices[&id] as i64 * count as i64;
        }
        self.customers += 1;
        if self.customers % self.n == 0 {
            return bill as f64 * (100 - self.discount) as f64 / 100.0;
        }
        bill as f64
    }
}
