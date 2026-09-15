impl Solution {
    pub fn final_prices(prices: Vec<i32>) -> Vec<i32> {
        let mut answer = prices.clone();
        let mut stack: Vec<usize> = Vec::new(); // indices with pending discount
        for i in 0..prices.len() {
            let price = prices[i];
            while let Some(&top) = stack.last() {
                if prices[top] < price {
                    break;
                }
                stack.pop();
                answer[top] -= price;
            }
            stack.push(i);
        }
        answer
    }
}
