# TODO — open items only

Check off and delete as they land. Full context: CLAUDE.md,
docs/api-and-cli.md, docs/TRUST-BOUNDARIES.md, and the
verification-program record in
`../coderpuzzle-problems/.localonly/VARIANT-WAVE-II.md`.

## Deferred — provided-code protection

- [ ] **D5** Anti-cheat static signal for provided-symbol tampering —
      deferred: detection is cat-and-mouse and the stakes do not
      justify it. Everything else in this work area is landed: the
      corpus sweep classified all 3,111 provided files (only 0843's
      oracle family is state-bearing, inherent to the genre and
      already judge-mediated), and the trust stance is documented in
      docs/TRUST-BOUNDARIES.md.

## User accounts — identity and admin surface (multi-user phase 2)

Attempt records (verdicts, submitted code, time-cost vs the reference),
per-problem progress — never tried / attempted / solved, solved meaning
any one language passed — the guest session lifecycle (cleared on
idle-expiry), and the web-UI status marks (landing list, problem drawer,
problem view; guests included) are done and live. Remaining:

- [x] **Pluggable auth** — login is a provider catalog (`docs/AUTH.md`);
  password is the built-in credentials provider; OAuth/OIDC/email OTP
  enable via env. Remaining identity work is below, not a new protocol.
- [ ] **Better password and user identity management** (subject to
  design discussion) — scrypt-with-salt and the fixed-name admin
  bootstrap are a baseline; account linking across providers is
  schema-ready and not yet exposed
- [ ] **Admin management surface** (listing/deleting accounts, resetting
  passwords) once the accounts UI grows beyond the gate
