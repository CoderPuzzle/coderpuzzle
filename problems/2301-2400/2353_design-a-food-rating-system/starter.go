package main

type FoodRatings struct{}

func NewFoodRatingsTyped(foods []string, cuisines []string, ratings []int) *FoodRatings {
	panic("TODO")
}

func (design *FoodRatings) changeRating(food string, newRating int) {
	panic("TODO")
}

func (design *FoodRatings) highestRated(cuisine string) string {
	panic("TODO")
}
