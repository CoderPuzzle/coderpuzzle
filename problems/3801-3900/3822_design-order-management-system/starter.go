package main

type OrderManagementSystem struct{}

func NewOrderManagementSystemTyped() *OrderManagementSystem {
	panic("TODO")
}

func (design *OrderManagementSystem) addOrder(orderId int, orderType string, price int) {
	panic("TODO")
}

func (design *OrderManagementSystem) modifyOrder(orderId int, newPrice int) {
	panic("TODO")
}

func (design *OrderManagementSystem) cancelOrder(orderId int) {
	panic("TODO")
}

func (design *OrderManagementSystem) getOrdersAtPrice(orderType string, price int) []int {
	panic("TODO")
}
