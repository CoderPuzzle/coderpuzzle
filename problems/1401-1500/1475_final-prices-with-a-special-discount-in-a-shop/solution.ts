function finalPrices(prices: number[]): number[] {
    const answer = prices.slice();
    const stack: number[] = []; // indices with pending discount
    for (let i = 0; i < prices.length; i++) {
        const price = prices[i];
        while (stack.length > 0 && prices[stack[stack.length - 1]] >= price) {
            answer[stack.pop()!] -= price;
        }
        stack.push(i);
    }
    return answer;
}
