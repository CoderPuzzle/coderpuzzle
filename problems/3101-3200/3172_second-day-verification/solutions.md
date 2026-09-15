# Solutions — Second Day Verification

## One EXISTS probe per email against the calendar next day

A user qualifies exactly when their email owns a `Verified` text stamped on
the calendar day after signup. `DATE(e.signup_date, '+1 day')` computes that
date directly from the stored datetime — SQLite's date modifiers shift by
whole days, so the time-of-day part is discarded and only the date of the
next calendar day remains — and `DATE(t.action_date)` strips the candidate
text's time. The correlated `EXISTS` therefore asks, for each row of
`emails`: does any text with this `email_id`, action `'Verified'`, land on
that exact day? The database short-circuits at the first match per email.

Rows that must not qualify fail the probe naturally: texts on the signup day
itself (the modifier moves to tomorrow first), on later days (the dates no
longer compare equal), and `'Not Verified'` actions regardless of timing (the
action filter discards them before the date check). Users with no texts at
all never enter the inner query, and users verified only on later days stay
out — which is what the ordering clause then reports plainly:
`ORDER BY user_id` returns the survivors in ascending order.

**Complexity:** `O(m log m)` time, `O(1)` extra space per probe — with an
index on `texts.email_id` each of the `m` emails probes its own texts in
logarithmic time; overall work scales as `O(n + Σ texts(email))`.
