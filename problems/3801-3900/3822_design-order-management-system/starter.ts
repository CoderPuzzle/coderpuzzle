class OrderManagementSystem {
    constructor() {}

    addOrder(orderId: number, orderType: string, price: number) {}

    modifyOrder(orderId: number, newPrice: number) {}

    cancelOrder(orderId: number) {}

    getOrdersAtPrice(orderType: string, price: number): number[] {}
}
