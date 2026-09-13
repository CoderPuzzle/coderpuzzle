# Predictable judge resources

## Contract

A run has a fixed resource envelope, not deterministic elapsed milliseconds.
CPU frequency, caches, memory bandwidth, interrupts, and a VM's host still
introduce variation. Production comparisons require homogeneous dedicated
Linux CPUs, pinned runner images and the same timing profile. Never compare
historical wall times with new CPU times as if they were the same measurement.

Two explicit profiles are supported:

- `shared` (default): the existing portable Docker setup, calibrated wall
  deadlines, process rlimits and container-wide ceilings. No exclusivity claim.
- `isolated`: Linux cgroup v2, a host-provisioned exclusive CPU partition and
  one serial worker per slot. Every testcase gets a fresh cgroup. Missing or
  degraded isolation is a system error, never a fallback to shared execution.

## Topology and admission

Execution slots reserve whole physical cores, including every SMT sibling.
By default control work also has dedicated cores. With `--shared-control`,
control CPUs are shared with host services; only execution cores are exclusive.
This supports two-physical-core hosts, at the cost of contention for compilation
and service work. Within the slot, `control` contains the
Docker container, supervisor, compilation and warming; `runs` is an isolated
partition for testcase processes. Shared-control mode uses a remote isolated
partition below a non-partition parent and requires the kernel's
`cpuset.cpus.exclusive` support. The execution isolation contract is unchanged. A testcase uses one logical CPU of its
reserved physical core by default; the unused SMT siblings remain reserved.
This keeps single-threaded and threaded programs on a consistent one-CPU budget.
Larger execution sets are a separate profile, not a transparent capacity boost.

The host owns partition settings and hard slot ceilings. Only UID 10000, the
trusted supervisor, can create run groups and migrate processes within its
slot. UID 65534 cannot write any cgroup controls. Only that slot's subtree is
mounted writable; neither the Docker socket nor the host cgroup root is
exposed. Containers retain separate PID namespaces and no network access.

A slot has fixed control and execution memory budgets plus overhead. There is
no memory overcommit within it; a testcase requesting more than the execution
budget fails as a system/configuration error. `memory.max` is a ceiling, not a
physical reservation. Operators must reserve the sum of slot budgets and host
headroom, keep other services bounded, and avoid shared-vCPU hosts. The host
setup checks available memory at provisioning time; ongoing host admission is
an operational responsibility. Swap is disabled for the entire slot.

The worker is serial. Multiple containers may consume the same local queue:
an exclusive advisory lock on the ready file claims each job, held through
response publication. Process death releases the claim, allowing retry. Do
not scale replicas inside one slot; use separately provisioned slots with
non-overlapping cores. Existing API admission bounds waiting requests; it is
per API process, not a distributed queue limit. Queue wait and compilation are
outside testcase runtime.

## Execution and accounting

The trusted launcher joins a fresh cgroup before dropping identity and execing
user code. Descendants inherit it, including double-forked processes and new
sessions. Each group sets `memory.max`, `memory.swap.max=0`, `memory.oom.group=1`
and `pids.max`; rlimits still bound address space, output and file descriptors.
The physical memory limit is the problem's `memory_mb`; managed-runtime virtual
address reservations do not inflate it. Threads and the interpreter/harness
count toward the physical memory and CPU budgets.

The supervisor samples `cpu.stat` on a short bounded interval. CPU time includes
all cgroup processes and threads, user and system CPU, including launcher and
runtime startup after attachment. CPU usage before attachment and memory pages
already charged to the supervisor are not retrospectively reassigned by Linux.
Wall time includes launch and waiting, but excludes preparation and compilation.
On every exit, including successful harness output, `cgroup.kill` removes all
remaining descendants before final accounting and removal. A kernel OOM event
takes precedence over a forged success protocol. Supervisor metrics overwrite
submission-provided fields. A monitoring or cleanup failure yields system_error.

In isolated mode startup wall-clock calibration is disabled: `time_ms` is the
fixed CPU budget for ordinary problems, and the secondary wall deadline is
`max(1000, 5 * time_ms)` milliseconds. A problem declaring `threads` keeps
`time_ms` as its wall deadline, with an additional total CPU budget of
`time_ms * execution_CPU_count`. This preserves the concurrency scheduling
contract instead of summing thread times against a single-thread wall budget.
The monitor also checks final usage, so a process exiting between samples
cannot evade the CPU limit. Enforcement has polling/scheduler overshoot and
is not a hard real-time guarantee.

Results identify `timing_mode` (`wall` or `cpu`) and `resource_profile`.
`runtime_ms` remains the existing aggregate/display field: wall time in shared
mode and CPU time in isolated mode. Public cases also expose `cpu_time_ms`
(only when measured), `wall_time_ms`, CPU/wall budget fields, memory peak,
CPU throttling and the timeout reason. Hidden cases retain only private
accounting until aggregation; no hidden per-case measurements are exposed.
Zero CPU milliseconds is valid for a very short run. Existing stored results
without a timing mode mean legacy wall time. Reference ratios are omitted
when reference and submission profiles differ.

## Deployment and validation

See the deployment section below for the supported host preparation and
Compose override. Shared mode and authoring CLI remain available on macOS and
Docker Desktop; neither is a production timing benchmark.

Acceptance requires both ordinary regression tests and Linux integration tests:
CPU loops hit CPU limits, sleeps hit wall limits, descendants are accounted and
killed, OOM cannot report accepted, concurrent workers claim a job once, bad
partition settings fail closed, and UID 65534 cannot move or change limits.
Measure repeated reference executions under idle, API load and compilation
load; compare median and tail spread, not exact milliseconds. Record hardware,
runner image, profile and sample count alongside measurements. Such host-level
variance measurements must be run on the actual dedicated deployment node.

## Sources

- [Linux cgroup v2](https://docs.kernel.org/admin-guide/cgroup-v2.html): cpuset
  partitions, delegation, memory ownership, cpu.stat and cgroup.kill.

## Enable a Linux slot

Requirements: rootful Docker with a cgroup v2 `systemd` or `cgroupfs` driver,
Linux interfaces for isolated cpuset partitions, `cgroup.kill` and
`memory.peak`, and at least two physical cores with `--shared-control`, or three for
separate host, control and execution cores.
The supervisor probes required interfaces; unsupported kernels fail closed.
Use `lscpu -e=CPU,CORE,SOCKET,NODE` and each CPU's
`/sys/devices/system/cpu/cpuN/topology/thread_siblings_list` to select whole
cores. For NUMA machines, place control and execution on the same node and
configure the slot's `cpuset.mems` accordingly before launch; the provisioner
inherits the host's allowed memory nodes by default.

For example, on a host **without SMT**, reserve CPU 2 for control and CPU 3
for execution, keeping CPUs 0–1 for the host. These are examples, not portable
CPU numbers. With SMT, supply every sibling in `--control-cpus` and
`--reserved-cpus`, but typically one logical CPU in `--execution-cpus`.

```sh
sudo python3 scripts/prepare_judge_host.py \
  --slot a --control-cpus 2 --reserved-cpus 3 --execution-cpus 3 \
  --control-memory-mb 768 --execution-memory-mb 512 --headroom-mb 1024 \
  --profile dedicated-host-model-runner-release-cpu-v1 \
  --output /etc/coderpuzzle-slot-a.env

docker compose --env-file /etc/coderpuzzle-slot-a.env \
  -f compose.yaml -f compose.isolated.yaml up -d --build
```

The profile identifies CPU model, runtime image/release, execution CPU count
and budget policy. Use the same label only for equivalent slots. Parent
memory is control + maximum execution + 128 MiB overhead; the setup also
checks requested host headroom against current MemAvailable. Budget and CPU
settings are fixed for the slot's lifetime. Keep compiler/formatting control
work within its separate budget. Kernel IRQ placement and frequency policy
remain host responsibilities; neither container quotas nor this setup can
remove hypervisor steal time.

The helper emits a host cgroup path, Docker parent, CPU lists and a lock path.
It supports systemd by creating transient slice units in `/run/systemd/system`;
for cgroupfs it creates a top-level subtree directly. Resources and locks
under `/run` must be provisioned after reboot, before restarting the runner.
Use a host boot service ordered after Docker and before the application to
repeat provisioning; remove the old generated env file first. This repository
does not change the host's Docker driver or install a boot service implicitly.

To add capacity, provision another slot with disjoint whole cores and a new
slot name. Create a separate runner service with its own emitted values,
sharing the application's `judge_queue` volume. The queue claim code supports
multiple workers; the fixed host lock rejects two workers targeting one slot.
Do not use `docker compose --scale runner=N` with one slot environment. Slots
sharing one queue must use equivalent execution profiles. A reference ratio
is withheld if a differently configured worker executes the reference.

To reprovision, first stop that slot's runner. Remove **only its empty**
`runs` subtree and Docker control subtree, then its slot root and lock. With
systemd, stop the corresponding control and parent slices, remove their
transient unit files and reload systemd. The helper refuses existing slots
and configuration files. On setup failure inspect and remove only the
partially created slot before retrying; never recursively delete the host
cgroup root. To return to shared mode, recreate the runner with only
`compose.yaml`; existing records preserve their original timing labels.

## Run Linux integration checks

Build the updated runner and provision a **test** slot as above. Stop its
normal worker before launching the test process, since the slot lease allows
only one supervisor. Keep production slots untouched.

```sh
docker compose --env-file /etc/coderpuzzle-test-slot.env \
  -f compose.yaml -f compose.isolated.yaml run --rm --no-deps \
  -e CODERPUZZLE_RESOURCE_TESTS=1 \
  -v "$PWD/tests/test_resource_linux.py:/resource-tests.py:ro" \
  -v "$PWD/problems/0001-0100/0001_pair-sum:/test-bundle:ro" \
  --entrypoint coderpuzzle-supervisor-python runner -I -S /resource-tests.py
```

The ordinary `python3.14 -m pytest -q` suite skips these kernel-dependent
checks. The integration command runs real confined processes, including the
full queue/prepare/testcase/result path for the bundled reference solutions.
A Docker Desktop test validates kernel enforcement, not dedicated-hardware
performance stability. This change does not deploy to a production host or
claim an unmeasured runtime variance target.

## Verification recorded for this implementation

- 186 ordinary tests passed (66 subtests); 11 Linux-only tests are skipped
  by the portable test command and were run separately.
- All 11 Linux integration tests passed on Docker Desktop LinuxKit 7.0.12,
  cgroup v2/cgroupfs, using the existing runner image with updated supervisor
  files. Test processes had the production five-capability set, read-only
  root filesystem, separate PID namespace and no network.
- The full job path passed the Pair Sum public cases for Python, C++, Go,
  Rust, Java, JavaScript and TypeScript.
- Frontend production build, merged Compose validation and focused Python
  error checks passed. The frontend retains its existing large-chunk warning.
- The systemd provisioning branch and dedicated-host performance variation
  have not been exercised here. Verify both on the deployment host before
  treating its timing profile as a production benchmark.

## Compact two-core deployment

For a four-vCPU/two-core VM whose SMT pairs are `0,2` and `1,3`, pass
`--shared-control --control-cpus 0,2 --reserved-cpus 1,3 --execution-cpus 1`.
Host services and compilation share the first physical core; execution owns
the second core and uses one logical CPU. There is no VM resize requirement.
Check topology rather than assuming consecutive CPU numbers are siblings.
The emitted `CODERPUZZLE_SHARED_CONTROL=1` selects the matching startup checks.
