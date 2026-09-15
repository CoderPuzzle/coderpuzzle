class Solution:
    def totalWaviness(self, num1: int, num2: int) -> int:
        # f(N) = total waviness of 1..N; the answer telescopes to
        # f(num2) - f(num1 - 1). The walk keeps two parallel tables over
        # (started, last digit, second-last digit): one for prefixes still
        # equal to N's prefix ("tight") and one for prefixes already below
        # it ("free"). Digit 10 stands for "no digit yet".
        def f(n: int) -> int:
            if n <= 0:
                return 0
            digits = [int(c) for c in str(n)]
            none = 10

            # cnt[s][a][b]: how many live prefixes end in digits a then b,
            # having placed a nonzero leading digit when s == 1; wav holds
            # the waviness those prefixes have accumulated so far.
            def blank():
                cnt = [[[0] * 11 for _ in range(11)] for _ in range(2)]
                wav = [[[0] * 11 for _ in range(11)] for _ in range(2)]
                return cnt, wav

            tight_cnt, tight_wav = blank()
            free_cnt, free_wav = blank()
            tight_cnt[0][none][none] = 1
            for pos, limit in enumerate(digits):
                ntight_cnt, ntight_wav = blank()
                nfree_cnt, nfree_wav = blank()
                for tight in (True, False):
                    cnt, wav = (tight_cnt, tight_wav) if tight else (free_cnt, free_wav)
                    hi = limit if tight else 9
                    for s in range(2):
                        for d1 in range(11):
                            for d2 in range(11):
                                count = cnt[s][d1][d2]
                                if count == 0:
                                    continue
                                total = wav[s][d1][d2]
                                for x in range(hi + 1):
                                    started = 1 if (s == 1 or x != 0) else 0
                                    gain = 0
                                    if s == 1:
                                        if d2 != none:
                                            m, a, b = d1, d2, x
                                            if (m > a and m > b) or (m < a and m < b):
                                                gain = 1
                                        nd1, nd2 = x, d1
                                    elif started == 1:
                                        nd1, nd2 = x, none
                                    else:
                                        nd1, nd2 = none, none
                                    acc = total + gain * count
                                    if tight and x == hi:
                                        ntight_cnt[started][nd1][nd2] += count
                                        ntight_wav[started][nd1][nd2] += acc
                                    else:
                                        nfree_cnt[started][nd1][nd2] += count
                                        nfree_wav[started][nd1][nd2] += acc
                tight_cnt, tight_wav = ntight_cnt, ntight_wav
                free_cnt, free_wav = nfree_cnt, nfree_wav
            grand = 0
            for tab in (tight_wav, free_wav):
                for s in range(2):
                    for d1 in range(11):
                        for d2 in range(11):
                            grand += tab[s][d1][d2]
            return grand

        return f(num2) - f(num1 - 1)
