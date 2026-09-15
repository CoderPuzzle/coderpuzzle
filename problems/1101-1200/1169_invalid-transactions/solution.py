class Solution:
    def invalidTransactions(self, transactions: List[str]) -> List[str]:
        parsed = [t.split(",") for t in transactions]
        n = len(parsed)
        flags = [False] * n
        # An amount over the limit convicts on its own; otherwise the
        # transaction waits for a same-name partner in another city within
        # 60 minutes — which may appear anywhere in the array.
        for i in range(n):
            name_i, time_i, amount_i, city_i = parsed[i]
            if int(amount_i) > 1000:
                flags[i] = True
                continue
            for j in range(n):
                if i == j or parsed[j][0] != name_i or parsed[j][3] == city_i:
                    continue
                if abs(int(time_i) - int(parsed[j][1])) <= 60:
                    flags[i] = True
                    break
        return [transactions[i] for i in range(n) if flags[i]]
