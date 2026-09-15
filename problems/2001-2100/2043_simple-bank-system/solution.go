package main

type Bank struct {
	balance []int64
}

func NewBankTyped(balance []int64) *Bank {
	return &Bank{balance: append([]int64(nil), balance...)}
}

func (bank *Bank) transfer(account1 int, account2 int, money int64) bool {
	if !bank.valid(account1) || !bank.valid(account2) || bank.balance[account1-1] < money {
		return false
	}
	bank.balance[account1-1] -= money
	bank.balance[account2-1] += money
	return true
}

func (bank *Bank) deposit(account int, money int64) bool {
	if !bank.valid(account) {
		return false
	}
	bank.balance[account-1] += money
	return true
}

func (bank *Bank) withdraw(account int, money int64) bool {
	if !bank.valid(account) || bank.balance[account-1] < money {
		return false
	}
	bank.balance[account-1] -= money
	return true
}

func (bank *Bank) valid(account int) bool {
	return account >= 1 && account <= len(bank.balance)
}
