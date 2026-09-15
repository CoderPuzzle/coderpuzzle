pub struct OrderManagementSystem;

impl OrderManagementSystem {
    pub fn new() -> Self {
        panic!("TODO")
    }

    pub fn addOrder(&mut self, orderId: i32, orderType: String, price: i32) {
        panic!("TODO")
    }

    pub fn modifyOrder(&mut self, orderId: i32, newPrice: i32) {
        panic!("TODO")
    }

    pub fn cancelOrder(&mut self, orderId: i32) {
        panic!("TODO")
    }

    pub fn getOrdersAtPrice(&mut self, orderType: String, price: i32) -> Vec<i32> {
        panic!("TODO")
    }
}
