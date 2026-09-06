# TODO — open items only

Check off and delete as they land. Full context: CLAUDE.md,
docs/api-and-cli.md, docs/TRUST-BOUNDARIES.md, and the
verification-program record in
`../openoj-problems/.localonly/VARIANT-WAVE-II.md`.

## In flight — verification program closing

- [ ] **F1** Corner-case audits — COMPLETE: all 59 bundles audited
      (additions where gaps were found; several verified no-change)
- [ ] **F2** Judged sweeps to completion — both trees, ~26/41 shards;
      every cumulative failure is a fixed class (0478 flake — judge
      floor now 4σ, 0587 cpp, 1865 segfault)
- [ ] **F3** Final formatter pass over late corner-case edits (last
      pass: 0 normalizations on 430 files)
- [ ] **F4** Final static checks — adapt PASSED; originals clean except
      the 12 by-design dual-id notes
- [ ] **F5** Parity audit — OK (208 ↔ 211); re-run at close
- [ ] **F7** Commit → push → deploy to katze → confirm CI green

## Provided-code protection — deferred remainder

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

- [ ] **Better password and user identity management** (subject to
  design discussion) — the current scrypt-with-salt scheme and
  fixed-name admin bootstrap are a baseline, not the destination
- [ ] **Admin management surface** (listing/deleting accounts, resetting
  passwords) once the accounts UI grows beyond the gate
