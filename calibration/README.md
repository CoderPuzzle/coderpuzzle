# Calibration artifact

`calibration.json` is the algorithm-timing calibration record for this
repo's own `problems/` tree — one reference measurement per (slug,
language) pair, read by `api/app/calibration.py` at deploy time
(`CODERPUZZLE_CALIBRATION_DIR`, `CODERPUZZLE_REQUIRE_CALIBRATION=1`). See
`docs/api-and-cli.md` for the fields and how the judge uses them, and
`TODO.md` for the mechanism history.

This file is the artifact actually served in production (katze), copied
here after the sweep so the measurement basis for every deployed judge
verdict is reviewable and reproducible, not just a private docker volume.

## Measurement run (repeat-and-divide re-calibration)

- **Machine**: GCP VM `katze`, zone `us-east4-a`, project
  `zdong-14850-alefa-ai`, machine type `c4d-highcpu-4`.
- **CPU**: AMD EPYC 9B45, 4 logical CPUs, 2 physical cores.
- **Memory**: 7,090,944 KiB (~6.8 GiB).
- **Platform**: `Linux-7.0.0-1011-gcp-x86_64-with-glibc2.41`.
- **Hardware fingerprint**: `56252d335e800bd180b94233756d9ab49e7f74fe2597de0b81b018f650c966eb`.
- **cgroup limits at measurement time**: `cpu.max=max 100000`,
  `cpuset.cpus.effective=0-3`, `memory.max=max`, `memory.swap.max=max`,
  `pids.max=7288`.
- **Run mode**: measured directly inside the live production `api`
  container (`coderpuzzle-api-1`), resumed from the pre-existing
  calibration checkpoint with exactly the 9,289 function-kind,
  below-target pairs invalidated first (see `TODO.md`) — not a blind
  `--restart`.
- **Completed**: 2026-09-23T15:40:12Z, duration 96,000.9s (~26h40m) for
  this resumed portion.
- **Result**: 25,790 records, 0 failures; 9,174 pairs picked up
  `algorithm_repeat_count > 1` (194 at the 1000 cap).
- **Timing mode / resource profile**: `wall` / `shared-wall-v1`.

A pre-sweep backup of the prior calibration state is not tracked here
(private local/VM backups only) — this file is the post-sweep result,
the one actually serving production.
