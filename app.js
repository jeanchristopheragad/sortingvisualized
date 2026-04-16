const algorithmNames = [
  "Quick Sort",
  "Merge Sort",
  "Timsort",
  "Heap Sort",
  "Bubble Sort",
  "Insertion Sort",
  "Selection Sort",
  "Radix Sort",
  "Counting Sort",
  "Bucket Sort",
  "Shell Sort",
  "Introsort",
  "Cocktail Shaker Sort",
  "Gnome Sort",
  "Comb Sort",
  "Tree Sort",
  "Cycle Sort",
  "Patience Sorting",
  "Block Sort",
  "Library Sort"
];

const algorithmDetails = {
  "Quick Sort": {
    category: "Divide and Conquer",
    complexity: "Avg O(n log n), Worst O(n^2)",
    description: "Quick Sort picks a pivot, partitions values into smaller and larger sides, then recursively sorts each side.",
    process: "This visualizer uses the last element as the pivot, scans the range, swaps smaller values forward, then places the pivot into its final index.",
    code: `async function quickSortRecursive(low, high) {
  if (low >= high) return;
  const pivot = arr[high];
  let i = low;
  for (let j = low; j < high; j += 1) {
    if (arr[j] < pivot) {
      swap(i, j);
      i += 1;
    }
  }
  swap(i, high);
  await quickSortRecursive(low, i - 1);
  await quickSortRecursive(i + 1, high);
}`
  },
  "Merge Sort": {
    category: "Divide and Conquer",
    complexity: "O(n log n)",
    description: "Merge Sort repeatedly splits the array into halves, sorts each half, then merges them back in order.",
    process: "The animation writes merged values back into the main array one slot at a time, so you can see the reconstruction phase clearly.",
    code: `async function mergeSortRecursive(left, right) {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  await mergeSortRecursive(left, mid);
  await mergeSortRecursive(mid + 1, right);
  await merge(left, mid, right);
}`
  },
  Timsort: {
    category: "Hybrid Stable Sort",
    complexity: "O(n log n)",
    description: "Timsort combines insertion sort on small runs with merge sort on larger merged runs.",
    process: "This implementation sorts short chunks first, then repeatedly merges neighboring runs into bigger sorted regions.",
    code: `const RUN = 16;
for (let i = 0; i < arr.length; i += RUN) {
  await insertionSortRange(i, Math.min(i + RUN - 1, arr.length - 1));
}
for (let size = RUN; size < arr.length; size *= 2) {
  // merge adjacent runs
}`
  },
  "Heap Sort": {
    category: "Selection via Heap",
    complexity: "O(n log n)",
    description: "Heap Sort first turns the array into a max-heap, then repeatedly moves the largest value to the end.",
    process: "You see heap maintenance swaps as the root is exchanged with the end of the active heap and the heap is rebuilt.",
    code: `async function heapSort() {
  buildMaxHeap(arr);
  for (let end = arr.length - 1; end > 0; end -= 1) {
    swap(0, end);
    await heapify(end, 0);
  }
}`
  },
  "Bubble Sort": {
    category: "Exchange Sort",
    complexity: "O(n^2)",
    description: "Bubble Sort compares neighbors and swaps them whenever they are out of order, pushing larger values rightward.",
    process: "Each pass bubbles the largest remaining unsorted value to the far right, so the sorted suffix grows one bar at a time.",
    code: `for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < n - i - 1; j += 1) {
    if (compare(j, j + 1) > 0) {
      swap(j, j + 1);
    }
  }
}`
  },
  "Insertion Sort": {
    category: "Incremental Sort",
    complexity: "O(n^2)",
    description: "Insertion Sort grows a sorted left side by inserting each new value into its proper position.",
    process: "The current value is held aside while larger items shift right until the insertion slot is found.",
    code: `for (let i = 1; i < arr.length; i += 1) {
  const current = arr[i];
  let j = i - 1;
  while (j >= 0 && arr[j] > current) {
    write(j + 1, arr[j]);
    j -= 1;
  }
  write(j + 1, current);
}`
  },
  "Selection Sort": {
    category: "Selection Sort",
    complexity: "O(n^2)",
    description: "Selection Sort repeatedly finds the minimum remaining value and places it at the next sorted position.",
    process: "Each outer pass scans for the smallest unsorted element, then swaps it into place on the left.",
    code: `for (let i = 0; i < n; i += 1) {
  let minIndex = i;
  for (let j = i + 1; j < n; j += 1) {
    if (compare(j, minIndex) < 0) minIndex = j;
  }
  swap(i, minIndex);
}`
  },
  "Radix Sort": {
    category: "Non-Comparative Sort",
    complexity: "O(d(n + k))",
    description: "Radix Sort orders integers digit by digit, from least significant to most significant position.",
    process: "This version runs counting sort on each digit place so values regroup by ones, tens, hundreds, and so on.",
    code: `for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
  await radixCountingSort(exp);
}`
  },
  "Counting Sort": {
    category: "Non-Comparative Sort",
    complexity: "O(n + k)",
    description: "Counting Sort counts how many times each value occurs, then reconstructs the array in order.",
    process: "The algorithm builds a frequency table, then writes values back from the smallest bucket to the largest.",
    code: `const count = Array(max - min + 1).fill(0);
for (const value of arr) count[value - min] += 1;
for (let value = min; value <= max; value += 1) {
  while (count[value - min] > 0) {
    write(index, value);
  }
}`
  },
  "Bucket Sort": {
    category: "Distribution Sort",
    complexity: "Avg O(n + k)",
    description: "Bucket Sort distributes values into ranges, sorts each bucket, then concatenates them.",
    process: "The array is split into sqrt-sized groups, each bucket is sorted internally, then everything is written back in bucket order.",
    code: `const buckets = Array.from({ length: bucketCount }, () => []);
for (const value of arr) {
  const bucketIndex = mapToBucket(value);
  buckets[bucketIndex].push(value);
}
for (const bucket of buckets) {
  bucket.sort((a, b) => a - b);
}`
  },
  "Shell Sort": {
    category: "Gap-Based Insertion Sort",
    complexity: "Depends on gaps",
    description: "Shell Sort performs insertion sort across shrinking gaps, reducing disorder before the final pass.",
    process: "Large gaps move distant values quickly, and smaller gaps finish the nearly sorted array efficiently.",
    code: `let gap = Math.floor(arr.length / 2);
while (gap > 0) {
  for (let i = gap; i < arr.length; i += 1) {
    // gap-based insertion
  }
  gap = Math.floor(gap / 2);
}`
  },
  Introsort: {
    category: "Hybrid Sort",
    complexity: "O(n log n)",
    description: "Introsort starts like quick sort, but switches strategies when recursion gets too deep.",
    process: "This version uses quick-sort-style partitioning, insertion sort for small regions, and a safe fallback when depth reaches its limit.",
    code: `if (size <= 16) insertionSortRange(start, end);
else if (depthLimit === 0) fallbackSortSlice(start, end);
else {
  const pivotIndex = partition(start, end);
  introsort(leftSide);
  introsort(rightSide);
}`
  },
  "Cocktail Shaker Sort": {
    category: "Bidirectional Exchange Sort",
    complexity: "O(n^2)",
    description: "Cocktail Shaker Sort is bubble sort in both directions, moving large values right and small values left.",
    process: "A forward pass pushes the maximum to the end, then a backward pass pulls the minimum to the front.",
    code: `while (swapped) {
  // left to right
  // right to left
}`
  },
  "Gnome Sort": {
    category: "Exchange Sort",
    complexity: "O(n^2)",
    description: "Gnome Sort walks forward when order is correct and steps backward to swap when it finds an inversion.",
    process: "It behaves like a tiny gardener repeatedly moving misplaced items back until they fit.",
    code: `let index = 0;
while (index < arr.length) {
  if (index === 0 || arr[index] >= arr[index - 1]) index += 1;
  else swap(index, index - 1), index -= 1;
}`
  },
  "Comb Sort": {
    category: "Gap Exchange Sort",
    complexity: "Avg O(n^2 / 2^p)",
    description: "Comb Sort improves bubble sort by first comparing far-apart elements with a shrinking gap.",
    process: "Large inversions are removed early with wide jumps, then the gap shrinks down to 1 for a finishing pass.",
    code: `let gap = arr.length;
while (gap > 1 || swapped) {
  gap = Math.max(1, Math.floor(gap / 1.3));
  for (let i = 0; i + gap < arr.length; i += 1) {
    if (compare(i, i + gap) > 0) swap(i, i + gap);
  }
}`
  },
  "Tree Sort": {
    category: "Tree-Based Sort",
    complexity: "Avg O(n log n)",
    description: "Tree Sort inserts values into a binary-search-ordered structure, then reads them back in-order.",
    process: "This visualizer emulates the ordered insert-and-readback behavior by maintaining a growing sorted container.",
    code: `const values = [];
for (const value of arr) {
  values.push(value);
  values.sort((a, b) => a - b);
}
writeBack(values);`
  },
  "Cycle Sort": {
    category: "Minimizes Writes",
    complexity: "O(n^2)",
    description: "Cycle Sort rotates each value directly into its final position, minimizing the number of writes.",
    process: "For each cycle start, the algorithm counts how many smaller values exist, places the item, then continues the cycle until it closes.",
    code: `for (let cycleStart = 0; cycleStart < n - 1; cycleStart += 1) {
  let item = arr[cycleStart];
  let pos = findFinalPosition(item);
  while (pos !== cycleStart) {
    place item and continue cycle;
  }
}`
  },
  "Patience Sorting": {
    category: "Pile-Based Sort",
    complexity: "O(n log n)",
    description: "Patience Sorting places values into piles like a card game, then merges the piles into sorted order.",
    process: "This version models the key idea with binary insertion into an ordered structure before writing results back.",
    code: `const sorted = [];
for (const value of arr) {
  const index = binarySearchInsertionIndex(sorted, value);
  sorted.splice(index, 0, value);
}
writeBack(sorted);`
  },
  "Block Sort": {
    category: "Hybrid Block Merge Sort",
    complexity: "Approx O(n log n)",
    description: "Block Sort divides the array into chunks, sorts each chunk, then merges the partially sorted blocks.",
    process: "Small blocks are sorted locally first, then a merge phase combines them into a fully ordered array.",
    code: `const blockSize = Math.floor(Math.sqrt(arr.length));
for (let i = 0; i < arr.length; i += blockSize) {
  sortBlock(arr.slice(i, i + blockSize));
}
await mergeSort();`
  },
  "Library Sort": {
    category: "Gapped Insertion Sort",
    complexity: "Avg O(n log n)",
    description: "Library Sort is an insertion-based strategy that keeps gaps to make future insertions cheaper.",
    process: "This simplified teaching version uses binary insertion into a helper array, then writes the ordered values back.",
    code: `const sorted = [];
for (const value of arr) {
  const index = binarySearchInsertionIndex(sorted, value);
  sorted.splice(index, 0, value);
}
writeBack(sorted);`
  },
  "Custom Python": {
    category: "User-Defined Logic",
    complexity: "Depends on your code",
    description: "The custom sandbox compiles your Python-like code into async JavaScript so it can drive the same animation engine.",
    process: "Whatever you type in the editor becomes the visible process here, so you can compare your logic with the built-in algorithms.",
    code: ""
  }
};

const state = {
  array: [],
  active: new Set(),
  writing: new Set(),
  sorted: new Set(),
  delay: 60,
  paused: false,
  sorting: false,
  currentAlgorithm: "Quick Sort",
  runContext: null
};

const elements = {
  bars: document.getElementById("bars"),
  arraySize: document.getElementById("arraySize"),
  rangeMin: document.getElementById("rangeMin"),
  rangeMax: document.getElementById("rangeMax"),
  manualArray: document.getElementById("manualArray"),
  generateBtn: document.getElementById("generateBtn"),
  shuffleBtn: document.getElementById("shuffleBtn"),
  applyManualBtn: document.getElementById("applyManualBtn"),
  algorithmSelect: document.getElementById("algorithmSelect"),
  playBtn: document.getElementById("playBtn"),
  pauseBtn: document.getElementById("pauseBtn"),
  speedSlider: document.getElementById("speedSlider"),
  speedValue: document.getElementById("speedValue"),
  metaDisplay: document.getElementById("metaDisplay"),
  statusText: document.getElementById("statusText"),
  algorithmGuideStatus: document.getElementById("algorithmGuideStatus"),
  algorithmGuideTitle: document.getElementById("algorithmGuideTitle"),
  algorithmGuideDescription: document.getElementById("algorithmGuideDescription"),
  algorithmGuideComplexity: document.getElementById("algorithmGuideComplexity"),
  algorithmGuideCategory: document.getElementById("algorithmGuideCategory"),
  algorithmGuideProcess: document.getElementById("algorithmGuideProcess"),
  algorithmGuideCode: document.getElementById("algorithmGuideCode"),
  codeEditor: document.getElementById("codeEditor"),
  runCustomBtn: document.getElementById("runCustomBtn"),
  consoleOutput: document.getElementById("consoleOutput")
};

for (const name of algorithmNames) {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  elements.algorithmSelect.appendChild(option);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitIfPaused() {
  while (state.paused) {
    await sleep(50);
  }
}

async function step(multiplier = 1) {
  await waitIfPaused();
  const duration = Math.max(0, state.delay * multiplier);
  if (state.runContext && duration > 0) {
    state.runContext.sleeps += 1;
  }
  if (duration > 0) {
    await sleep(duration);
  }
}

function logToConsole(message, type = "info") {
  const line = document.createElement("div");
  line.className = type;
  line.textContent = `[${type}] ${message}`;
  elements.consoleOutput.appendChild(line);
  elements.consoleOutput.scrollTop = elements.consoleOutput.scrollHeight;
}

function clearConsole() {
  elements.consoleOutput.innerHTML = "";
}

function createRunContext(label, source) {
  return {
    label,
    source,
    startedAt: performance.now(),
    compares: 0,
    swaps: 0,
    writes: 0,
    marks: 0,
    sleeps: 0,
    logs: 0,
    milestones: new Set()
  };
}

function beginRun(label, source) {
  state.runContext = createRunContext(label, source);
  logToConsole(`Starting ${label} via ${source}.`, "info");
}

function finishRun(status, extraMessage = "") {
  if (!state.runContext) {
    return;
  }

  const elapsedMs = Math.round(performance.now() - state.runContext.startedAt);
  const summary = [
    `status=${status}`,
    `time=${elapsedMs}ms`,
    `comparisons=${state.runContext.compares}`,
    `swaps=${state.runContext.swaps}`,
    `writes=${state.runContext.writes}`,
    `marks=${state.runContext.marks}`,
    `sleeps=${state.runContext.sleeps}`,
    `logs=${state.runContext.logs}`
  ];

  if (extraMessage) {
    summary.push(extraMessage);
  }

  logToConsole(`${state.runContext.label} summary: ${summary.join(" | ")}`, status === "completed" ? "success" : "error");
  state.runContext = null;
}

function trackMetric(metric, amount = 1) {
  if (!state.runContext) {
    return;
  }

  state.runContext[metric] += amount;
  const totalOps = state.runContext.compares + state.runContext.swaps + state.runContext.writes;
  const checkpoints = [25, 100, 250, 500, 1000, 2000, 5000];

  for (const checkpoint of checkpoints) {
    if (totalOps >= checkpoint && !state.runContext.milestones.has(checkpoint)) {
      state.runContext.milestones.add(checkpoint);
      logToConsole(
        `${state.runContext.label}: ${checkpoint}+ ops reached (cmp=${state.runContext.compares}, swp=${state.runContext.swaps}, wrt=${state.runContext.writes}).`,
        "info"
      );
    }
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function updateStatus(message) {
  elements.statusText.textContent = message;
  elements.metaDisplay.textContent = `Array Length: ${state.array.length}`;
}

function updateAlgorithmGuide(name = state.currentAlgorithm, mode = "reviewing") {
  const detail = algorithmDetails[name] || algorithmDetails["Custom Python"];
  const statusVerb = mode === "running" ? "Executing" : mode === "custom" ? "Editing" : "Reviewing";
  const fallback = algorithmDetails["Quick Sort"];
  const code = name === "Custom Python" ? elements.codeEditor.value : detail.code || fallback.code;

  elements.algorithmGuideStatus.textContent = `${statusVerb} ${name}.`;
  elements.algorithmGuideTitle.textContent = name;
  elements.algorithmGuideDescription.textContent = detail.description || fallback.description;
  elements.algorithmGuideComplexity.textContent = `Complexity: ${detail.complexity || fallback.complexity}`;
  elements.algorithmGuideCategory.textContent = `Type: ${detail.category || fallback.category}`;
  elements.algorithmGuideProcess.textContent = detail.process || fallback.process;
  elements.algorithmGuideCode.textContent = code;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderBars() {
  elements.bars.innerHTML = "";
  const max = Math.max(...state.array, 1);
  const showLabels = state.array.length <= 40;

  state.array.forEach((value, index) => {
    const wrap = document.createElement("div");
    wrap.className = "bar-wrap";

    const bar = document.createElement("div");
    bar.className = "bar";
    if (state.active.has(index)) {
      bar.classList.add("active");
    }
    if (state.writing.has(index)) {
      bar.classList.add("write");
    }
    if (state.sorted.has(index)) {
      bar.classList.add("sorted");
    }

    const height = clamp((value / max) * 100, 3, 100);
    bar.style.height = `${height}%`;
    bar.title = `Index ${index}: ${value}`;

    if (showLabels) {
      const label = document.createElement("div");
      label.className = "bar-label";
      label.textContent = value;
      wrap.appendChild(label);
    }

    wrap.appendChild(bar);
    elements.bars.appendChild(wrap);
  });
}

function syncArrayMutations(previousArray) {
  const maxLength = Math.max(previousArray.length, state.array.length);

  for (let i = 0; i < maxLength; i += 1) {
    if (previousArray[i] !== state.array[i] || i >= previousArray.length || i >= state.array.length) {
      state.writing.add(i);
      trackMetric("writes");
    }
  }

  renderBars();
}

function resetHighlights() {
  state.active.clear();
  state.writing.clear();
  state.sorted.clear();
  renderBars();
}

function setArray(newArray) {
  state.array = newArray.slice();
  resetHighlights();
  updateStatus("Array updated. Ready to sort.");
}

function generateRandomArray() {
  if (state.sorting) {
    return;
  }

  const size = clamp(Number(elements.arraySize.value) || 36, 5, 120);
  let min = Number(elements.rangeMin.value);
  let max = Number(elements.rangeMax.value);
  if (Number.isNaN(min)) min = 5;
  if (Number.isNaN(max)) max = 180;
  if (min > max) [min, max] = [max, min];

  const array = Array.from({ length: size }, () => randomInt(min, max));
  setArray(array);
}

function shuffleCurrentArray() {
  if (state.sorting) {
    return;
  }
  if (state.array.length < 2) {
    logToConsole("Need at least two values to shuffle the current array.", "error");
    return;
  }

  const shuffled = state.array.slice();
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  setArray(shuffled);
  logToConsole("Current array order shuffled without changing its values.", "info");
}

function applyManualArray() {
  if (state.sorting) {
    return;
  }

  const raw = elements.manualArray.value.trim();
  if (!raw) {
    logToConsole("Please enter a comma-separated array.", "error");
    return;
  }

  const values = raw
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((value) => !Number.isNaN(value));

  if (!values.length) {
    logToConsole("No valid numeric values were found in the manual array.", "error");
    return;
  }

  setArray(values);
  elements.arraySize.value = values.length;
}

function setControlsDisabled(disabled) {
  const ids = [
    "arraySize",
    "rangeMin",
    "rangeMax",
    "manualArray",
    "generateBtn",
    "shuffleBtn",
    "applyManualBtn",
    "algorithmSelect",
    "runCustomBtn"
  ];

  ids.forEach((id) => {
    elements[id].disabled = disabled;
  });

  elements.playBtn.disabled = false;
  elements.pauseBtn.disabled = false;
}

async function flash(indices, type = "active", multiplier = 1) {
  indices.forEach((index) => {
    if (type === "active") state.active.add(index);
    if (type === "write") state.writing.add(index);
  });
  renderBars();
  await step(multiplier);
  indices.forEach((index) => {
    if (type === "active") state.active.delete(index);
    if (type === "write") state.writing.delete(index);
  });
  renderBars();
}

async function compare(i, j) {
  trackMetric("compares");
  state.active.add(i);
  state.active.add(j);
  renderBars();
  await step();
  const result = state.array[i] - state.array[j];
  state.active.delete(i);
  state.active.delete(j);
  renderBars();
  return result;
}

async function compareValues(a, b) {
  await step(0.25);
  return a - b;
}

async function swap(i, j) {
  trackMetric("swaps");
  state.active.add(i);
  state.active.add(j);
  renderBars();
  await step();
  [state.array[i], state.array[j]] = [state.array[j], state.array[i]];
  renderBars();
  await step(0.6);
  state.active.delete(i);
  state.active.delete(j);
  renderBars();
}

async function write(index, value) {
  trackMetric("writes");
  state.writing.add(index);
  state.array[index] = value;
  renderBars();
  await step(0.8);
  state.writing.delete(index);
  renderBars();
}

async function markSorted(index) {
  trackMetric("marks");
  state.sorted.add(index);
  renderBars();
  await step(0.18);
}

async function markAllSorted() {
  state.active.clear();
  state.writing.clear();
  for (let i = 0; i < state.array.length; i += 1) {
    state.sorted.add(i);
    renderBars();
    await step(0.05);
  }
}

function binarySearchInsertionIndex(arr, value, endExclusive) {
  let left = 0;
  let right = endExclusive;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= value) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

async function insertionSortRange(left = 0, right = state.array.length - 1) {
  for (let i = left + 1; i <= right; i += 1) {
    const current = state.array[i];
    let j = i - 1;
    while (j >= left && state.array[j] > current) {
      await write(j + 1, state.array[j]);
      j -= 1;
    }
    await write(j + 1, current);
  }
}

async function bubbleSort() {
  const n = state.array.length;
  for (let i = 0; i < n; i += 1) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j += 1) {
      if ((await compare(j, j + 1)) > 0) {
        await swap(j, j + 1);
        swapped = true;
      }
    }
    state.sorted.add(n - i - 1);
    renderBars();
    if (!swapped) break;
  }
}

async function selectionSort() {
  const n = state.array.length;
  for (let i = 0; i < n; i += 1) {
    let minIndex = i;
    for (let j = i + 1; j < n; j += 1) {
      if ((await compare(j, minIndex)) < 0) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      await swap(i, minIndex);
    }
    state.sorted.add(i);
    renderBars();
  }
}

async function insertionSort() {
  await insertionSortRange();
}

async function cocktailShakerSort() {
  let start = 0;
  let end = state.array.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i += 1) {
      if ((await compare(i, i + 1)) > 0) {
        await swap(i, i + 1);
        swapped = true;
      }
    }
    state.sorted.add(end);
    end -= 1;
    if (!swapped) break;

    swapped = false;
    for (let i = end; i > start; i -= 1) {
      if ((await compare(i - 1, i)) > 0) {
        await swap(i - 1, i);
        swapped = true;
      }
    }
    state.sorted.add(start);
    start += 1;
  }
}

async function gnomeSort() {
  let index = 0;
  while (index < state.array.length) {
    if (index === 0 || state.array[index] >= state.array[index - 1]) {
      index += 1;
    } else {
      await swap(index, index - 1);
      index -= 1;
    }
  }
}

async function combSort() {
  const shrink = 1.3;
  let gap = state.array.length;
  let swapped = true;

  while (gap > 1 || swapped) {
    gap = Math.max(1, Math.floor(gap / shrink));
    swapped = false;

    for (let i = 0; i + gap < state.array.length; i += 1) {
      if ((await compare(i, i + gap)) > 0) {
        await swap(i, i + gap);
        swapped = true;
      }
    }
  }
}

async function shellSort() {
  let gap = Math.floor(state.array.length / 2);
  while (gap > 0) {
    for (let i = gap; i < state.array.length; i += 1) {
      const temp = state.array[i];
      let j = i;
      while (j >= gap && state.array[j - gap] > temp) {
        await write(j, state.array[j - gap]);
        j -= gap;
      }
      await write(j, temp);
    }
    gap = Math.floor(gap / 2);
  }
}

async function heapify(size, root) {
  let largest = root;
  const left = 2 * root + 1;
  const right = 2 * root + 2;

  if (left < size && state.array[left] > state.array[largest]) {
    largest = left;
  }
  if (right < size && state.array[right] > state.array[largest]) {
    largest = right;
  }
  if (largest !== root) {
    await swap(root, largest);
    await heapify(size, largest);
  }
}

async function heapSort() {
  const n = state.array.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
    await heapify(n, i);
  }
  for (let end = n - 1; end > 0; end -= 1) {
    await swap(0, end);
    state.sorted.add(end);
    renderBars();
    await heapify(end, 0);
  }
  state.sorted.add(0);
  renderBars();
}

async function merge(left, mid, right) {
  const leftPart = state.array.slice(left, mid + 1);
  const rightPart = state.array.slice(mid + 1, right + 1);
  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftPart.length && j < rightPart.length) {
    if ((await compareValues(leftPart[i], rightPart[j])) <= 0) {
      await write(k, leftPart[i]);
      i += 1;
    } else {
      await write(k, rightPart[j]);
      j += 1;
    }
    k += 1;
  }

  while (i < leftPart.length) {
    await write(k, leftPart[i]);
    i += 1;
    k += 1;
  }

  while (j < rightPart.length) {
    await write(k, rightPart[j]);
    j += 1;
    k += 1;
  }
}

async function mergeSortRecursive(left, right) {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  await mergeSortRecursive(left, mid);
  await mergeSortRecursive(mid + 1, right);
  await merge(left, mid, right);
}

async function mergeSort() {
  await mergeSortRecursive(0, state.array.length - 1);
}

async function quickSortRecursive(low, high) {
  if (low >= high) return;
  const pivot = state.array[high];
  let i = low;

  for (let j = low; j < high; j += 1) {
    state.active.add(j);
    state.active.add(high);
    renderBars();
    await step();
    if (state.array[j] < pivot) {
      if (i !== j) {
        await swap(i, j);
      }
      i += 1;
    }
    state.active.delete(j);
    state.active.delete(high);
    renderBars();
  }

  await swap(i, high);
  state.sorted.add(i);
  renderBars();
  await quickSortRecursive(low, i - 1);
  await quickSortRecursive(i + 1, high);
}

async function quickSort() {
  await quickSortRecursive(0, state.array.length - 1);
}

async function timSort() {
  const RUN = 16;
  for (let i = 0; i < state.array.length; i += RUN) {
    await insertionSortRange(i, Math.min(i + RUN - 1, state.array.length - 1));
  }
  for (let size = RUN; size < state.array.length; size *= 2) {
    for (let left = 0; left < state.array.length; left += size * 2) {
      const mid = Math.min(left + size - 1, state.array.length - 1);
      const right = Math.min(left + size * 2 - 1, state.array.length - 1);
      if (mid < right) {
        await merge(left, mid, right);
      }
    }
  }
}

async function countingSort() {
  if (!state.array.length) return;
  const min = Math.min(...state.array);
  const max = Math.max(...state.array);
  const count = Array(max - min + 1).fill(0);

  for (const value of state.array) {
    count[value - min] += 1;
    await step(0.1);
  }

  let index = 0;
  for (let offset = 0; offset < count.length; offset += 1) {
    while (count[offset] > 0) {
      await write(index, offset + min);
      index += 1;
      count[offset] -= 1;
    }
  }
}

async function radixCountingSort(exp) {
  const output = Array(state.array.length).fill(0);
  const count = Array(10).fill(0);

  for (let i = 0; i < state.array.length; i += 1) {
    count[Math.floor(state.array[i] / exp) % 10] += 1;
    await step(0.08);
  }
  for (let i = 1; i < 10; i += 1) {
    count[i] += count[i - 1];
  }
  for (let i = state.array.length - 1; i >= 0; i -= 1) {
    const digit = Math.floor(state.array[i] / exp) % 10;
    output[count[digit] - 1] = state.array[i];
    count[digit] -= 1;
  }
  for (let i = 0; i < output.length; i += 1) {
    await write(i, output[i]);
  }
}

async function radixSort() {
  if (state.array.some((value) => value < 0)) {
    throw new Error("Radix Sort currently supports non-negative integers only.");
  }
  const max = Math.max(...state.array, 0);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    await radixCountingSort(exp);
  }
}

async function bucketSort() {
  if (!state.array.length) return;
  const min = Math.min(...state.array);
  const max = Math.max(...state.array);
  const bucketCount = Math.max(1, Math.floor(Math.sqrt(state.array.length)));
  const buckets = Array.from({ length: bucketCount }, () => []);
  const range = max - min || 1;

  for (const value of state.array) {
    const index = Math.min(bucketCount - 1, Math.floor(((value - min) / range) * bucketCount));
    buckets[index].push(value);
    await step(0.08);
  }

  let arrayIndex = 0;
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
    for (const value of bucket) {
      await write(arrayIndex, value);
      arrayIndex += 1;
    }
  }
}

async function introsortUtility(start, end, depthLimit) {
  const size = end - start + 1;
  if (size <= 16) {
    await insertionSortRange(start, end);
    return;
  }
  if (depthLimit === 0) {
    const slice = state.array.slice(start, end + 1).sort((a, b) => a - b);
    for (let i = 0; i < slice.length; i += 1) {
      await write(start + i, slice[i]);
    }
    return;
  }
  const pivot = state.array[end];
  let partition = start;
  for (let j = start; j < end; j += 1) {
    if (state.array[j] < pivot) {
      await swap(partition, j);
      partition += 1;
    } else {
      await flash([j, end], "active", 0.5);
    }
  }
  await swap(partition, end);
  await introsortUtility(start, partition - 1, depthLimit - 1);
  await introsortUtility(partition + 1, end, depthLimit - 1);
}

async function introsort() {
  const depthLimit = Math.floor(Math.log2(state.array.length || 1)) * 2;
  await introsortUtility(0, state.array.length - 1, depthLimit);
}

async function treeSort() {
  const values = [];
  for (const value of state.array) {
    values.push(value);
    values.sort((a, b) => a - b);
    await step(0.12);
  }
  for (let i = 0; i < values.length; i += 1) {
    await write(i, values[i]);
  }
}

async function cycleSort() {
  const n = state.array.length;
  for (let cycleStart = 0; cycleStart <= n - 2; cycleStart += 1) {
    let item = state.array[cycleStart];
    let pos = cycleStart;

    for (let i = cycleStart + 1; i < n; i += 1) {
      if (state.array[i] < item) pos += 1;
      await flash([i], "active", 0.12);
    }
    if (pos === cycleStart) continue;

    while (item === state.array[pos]) pos += 1;
    [item, state.array[pos]] = [state.array[pos], item];
    await flash([pos], "write", 0.5);
    renderBars();

    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i += 1) {
        if (state.array[i] < item) pos += 1;
        await flash([i], "active", 0.08);
      }
      while (item === state.array[pos]) pos += 1;
      [item, state.array[pos]] = [state.array[pos], item];
      await flash([pos], "write", 0.45);
      renderBars();
    }
  }
}

async function patienceSorting() {
  const sorted = [];
  for (const value of state.array) {
    const index = binarySearchInsertionIndex(sorted, value, sorted.length);
    sorted.splice(index, 0, value);
    await step(0.12);
  }
  for (let i = 0; i < sorted.length; i += 1) {
    await write(i, sorted[i]);
  }
}

async function blockSort() {
  const blockSize = Math.max(4, Math.floor(Math.sqrt(state.array.length)));
  for (let i = 0; i < state.array.length; i += blockSize) {
    const block = state.array.slice(i, i + blockSize).sort((a, b) => a - b);
    for (let j = 0; j < block.length; j += 1) {
      await write(i + j, block[j]);
    }
  }
  await mergeSort();
}

async function librarySort() {
  const sorted = [];
  for (let i = 0; i < state.array.length; i += 1) {
    const value = state.array[i];
    const index = binarySearchInsertionIndex(sorted, value, sorted.length);
    sorted.splice(index, 0, value);
    await step(0.12);
  }
  for (let i = 0; i < sorted.length; i += 1) {
    await write(i, sorted[i]);
  }
}

const algorithms = {
  "Quick Sort": quickSort,
  "Merge Sort": mergeSort,
  Timsort: timSort,
  "Heap Sort": heapSort,
  "Bubble Sort": bubbleSort,
  "Insertion Sort": insertionSort,
  "Selection Sort": selectionSort,
  "Radix Sort": radixSort,
  "Counting Sort": countingSort,
  "Bucket Sort": bucketSort,
  "Shell Sort": shellSort,
  Introsort: introsort,
  "Cocktail Shaker Sort": cocktailShakerSort,
  "Gnome Sort": gnomeSort,
  "Comb Sort": combSort,
  "Tree Sort": treeSort,
  "Cycle Sort": cycleSort,
  "Patience Sorting": patienceSorting,
  "Block Sort": blockSort,
  "Library Sort": librarySort
};

async function runAlgorithm(algorithmName) {
  if (state.sorting) {
    state.paused = false;
    logToConsole(`Resuming ${state.currentAlgorithm}.`, "info");
    updateStatus(`Resuming ${state.currentAlgorithm}...`);
    return;
  }
  if (!state.array.length) {
    generateRandomArray();
  }

  state.sorting = true;
  state.paused = false;
  state.currentAlgorithm = algorithmName;
  resetHighlights();
  clearConsole();
  beginRun(algorithmName, "built-in algorithm");
  updateAlgorithmGuide(algorithmName, "running");
  updateStatus(`Running ${algorithmName}...`);
  setControlsDisabled(true);

  try {
    const algorithm = algorithms[algorithmName];
    if (!algorithm) {
      throw new Error(`Algorithm "${algorithmName}" is not implemented.`);
    }
    await algorithm();
    await markAllSorted();
    updateStatus(`${algorithmName} completed.`);
    updateAlgorithmGuide(algorithmName, "reviewing");
    logToConsole(`${algorithmName} completed successfully.`, "success");
    finishRun("completed");
  } catch (error) {
    updateStatus(`${algorithmName} stopped with an error.`);
    updateAlgorithmGuide(algorithmName, "reviewing");
    logToConsole(error.message, "error");
    finishRun("failed", error.message);
  } finally {
    state.sorting = false;
    state.paused = false;
    setControlsDisabled(false);
  }
}

function transformExpression(expression) {
  return expression
    .replace(/\band\b/g, "&&")
    .replace(/\bor\b/g, "||")
    .replace(/\bnot\b/g, "!")
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false")
    .replace(/\bNone\b/g, "null")
    .replace(/\blen\(/g, "len(")
    .replace(/(\w+)\.append\(/g, "$1.push(")
    .replace(/\bcompare\(/g, "await compare(")
    .replace(/\bswap\(/g, "await swap(")
    .replace(/\bwrite\(/g, "await write(")
    .replace(/\bmark_sorted\(/g, "await markSorted(")
    .replace(/\bsleep\(/g, "await sleep(")
    .replace(/\bprint\(/g, "log(");
}

function compilePythonLike(source) {
  const lines = source.replace(/\t/g, "    ").split("\n");
  const output = [];
  const stack = [];
  const scopeStack = [
    new Set(["arr", "compare", "swap", "write", "markSorted", "sleep", "log", "range", "len"])
  ];

  const closeToIndent = (indent) => {
    while (stack.length > indent) {
      const frame = stack.pop();
      if (frame.type === "function") {
        scopeStack.pop();
      }
      output.push(`${"    ".repeat(stack.length)}}`);
    }
  };

  for (let lineNumber = 0; lineNumber < lines.length; lineNumber += 1) {
    const originalLine = lines[lineNumber];
    const sanitizedLine = originalLine.replace(/#.*$/, "");

    if (!sanitizedLine.trim()) {
      continue;
    }

    const spaces = sanitizedLine.match(/^ */)[0].length;
    if (spaces % 4 !== 0) {
      throw new Error(`Compiler Error on line ${lineNumber + 1}: use multiples of 4 spaces for indentation.`);
    }
    const indent = spaces / 4;
    const trimmed = sanitizedLine.trim();

    if (/^(elif|else)\b/.test(trimmed)) {
      const lastFrame = stack[stack.length - 1];
      if (!lastFrame || lastFrame.type !== "block") {
        throw new Error(`Compiler Error on line ${lineNumber + 1}: '${trimmed.split(":")[0]}' has no matching if-block.`);
      }
      stack.pop();
      output.push(`${"    ".repeat(stack.length)}}`);
    } else {
      closeToIndent(indent);
    }

    const pad = "    ".repeat(indent);

    if (/^def\s+\w+\s*\(.*\):$/.test(trimmed)) {
      const [, functionName, args] = trimmed.match(/^def\s+(\w+)\s*\((.*)\):$/);
      output.push(`${pad}async function ${functionName}(${args}) {`);
      const functionScope = new Set();
      args
        .split(",")
        .map((arg) => arg.trim())
        .filter(Boolean)
        .forEach((arg) => functionScope.add(arg));
      scopeStack.push(functionScope);
      stack.push({ type: "function" });
      continue;
    }

    if (/^for\s+\w+\s+in\s+range\((.*)\):$/.test(trimmed)) {
      const [, variable, args] = trimmed.match(/^for\s+(\w+)\s+in\s+range\((.*)\):$/);
      output.push(`${pad}for (const ${variable} of range(${args})) {`);
      stack.push({ type: "block" });
      continue;
    }

    if (/^for\s+\w+\s+in\s+.+:$/.test(trimmed)) {
      const [, variable, iterable] = trimmed.match(/^for\s+(\w+)\s+in\s+(.+):$/);
      output.push(`${pad}for (const ${variable} of ${transformExpression(iterable)}) {`);
      stack.push({ type: "block" });
      continue;
    }

    if (/^while\s+.+:$/.test(trimmed)) {
      const expression = trimmed.slice(6, -1);
      output.push(`${pad}while (${transformExpression(expression)}) {`);
      stack.push({ type: "block" });
      continue;
    }

    if (/^if\s+.+:$/.test(trimmed)) {
      const expression = trimmed.slice(3, -1);
      output.push(`${pad}if (${transformExpression(expression)}) {`);
      stack.push({ type: "block" });
      continue;
    }

    if (/^elif\s+.+:$/.test(trimmed)) {
      const expression = trimmed.slice(5, -1);
      output.push(`${pad}else if (${transformExpression(expression)}) {`);
      stack.push({ type: "block" });
      continue;
    }

    if (trimmed === "else:") {
      output.push(`${pad}else {`);
      stack.push({ type: "block" });
      continue;
    }

    if (/:$/.test(trimmed)) {
      throw new Error(`Compiler Error on line ${lineNumber + 1}: unsupported block syntax.`);
    }

    let statement = transformExpression(trimmed);
    const assignmentMatch = trimmed.match(/^([A-Za-z_]\w*)\s*=(?!=)(.+)$/);
    if (assignmentMatch) {
      const variableName = assignmentMatch[1];
      const currentScope = scopeStack[scopeStack.length - 1];
      if (!currentScope.has(variableName)) {
        currentScope.add(variableName);
        statement = `var ${statement}`;
      }
    }

    output.push(`${pad}${statement};`);
  }

  closeToIndent(0);
  return `
    "use strict";
    return async function executeCustom({ arr, compare, swap, write, markSorted, sleep, log, range, len }) {
${output.map((line) => `      ${line}`).join("\n")}
    };
  `;
}

function range(start, stop, stepValue = 1) {
  let actualStart = start;
  let actualStop = stop;
  let actualStep = stepValue;

  if (actualStop === undefined) {
    actualStop = actualStart;
    actualStart = 0;
  }
  if (actualStep === 0) {
    throw new Error("range() step cannot be 0.");
  }

  const values = [];
  if (actualStep > 0) {
    for (let i = actualStart; i < actualStop; i += actualStep) values.push(i);
  } else {
    for (let i = actualStart; i > actualStop; i += actualStep) values.push(i);
  }
  return values;
}

const len = (value) => value.length;

async function runCustomCode() {
  if (state.sorting) {
    logToConsole("Pause or wait for the current sorting run to finish first.", "error");
    return;
  }

  if (!state.array.length) {
    generateRandomArray();
  }

  resetHighlights();
  clearConsole();
  state.currentAlgorithm = "Custom Python";
  beginRun("Custom Python", "compiler");
  updateAlgorithmGuide("Custom Python", "running");
  logToConsole("Compiling custom Python-style code...", "info");
  updateStatus("Running custom Python-style code...");
  setControlsDisabled(true);
  state.sorting = true;
  state.paused = false;

  try {
    const before = state.array.slice();
    const compiledSource = compilePythonLike(elements.codeEditor.value);
    const factory = new Function(compiledSource);
    const executeCustom = factory();
    await executeCustom({
      arr: state.array,
      compare,
      swap,
      write,
      markSorted,
      sleep,
      log: (message) => {
        if (state.runContext) {
          state.runContext.logs += 1;
        }
        logToConsole(String(message), "info");
      },
      range,
      len
    });
    syncArrayMutations(before);
    await step(0.4);
    state.writing.clear();
    renderBars();
    await markAllSorted();
    logToConsole("Custom code executed successfully.", "success");
    updateStatus("Custom sandbox run completed.");
    updateAlgorithmGuide("Custom Python", "custom");
    finishRun("completed");
  } catch (error) {
    const prefix = /Compiler Error/.test(error.message) ? "" : "Compiler Error: ";
    logToConsole(`${prefix}${error.message}`, "error");
    updateStatus("Custom sandbox failed.");
    updateAlgorithmGuide("Custom Python", "custom");
    finishRun("failed", error.message);
  } finally {
    state.sorting = false;
    state.paused = false;
    setControlsDisabled(false);
  }
}

elements.generateBtn.addEventListener("click", generateRandomArray);
elements.shuffleBtn.addEventListener("click", shuffleCurrentArray);
elements.applyManualBtn.addEventListener("click", applyManualArray);
elements.playBtn.addEventListener("click", () => runAlgorithm(elements.algorithmSelect.value));
elements.pauseBtn.addEventListener("click", () => {
  if (!state.sorting) {
    updateStatus("Nothing is currently running.");
    return;
  }
  state.paused = !state.paused;
  logToConsole(state.paused ? `Paused ${state.currentAlgorithm || "current run"}.` : `Resuming ${state.currentAlgorithm || "current run"}.`, "info");
  updateStatus(state.paused ? `Paused ${state.currentAlgorithm || "process"}.` : `Resuming ${state.currentAlgorithm || "process"}...`);
});
elements.runCustomBtn.addEventListener("click", runCustomCode);
elements.algorithmSelect.addEventListener("change", (event) => {
  state.currentAlgorithm = event.target.value;
  updateAlgorithmGuide(state.currentAlgorithm, "reviewing");
  updateStatus(`${state.currentAlgorithm} selected.`);
});
elements.codeEditor.addEventListener("input", () => {
  if (state.currentAlgorithm === "Custom Python") {
    updateAlgorithmGuide("Custom Python", "custom");
  }
});
elements.speedSlider.addEventListener("input", (event) => {
  state.delay = Number(event.target.value);
  elements.speedValue.textContent = `${state.delay} ms`;
});

generateRandomArray();
elements.speedValue.textContent = `${state.delay} ms`;
elements.algorithmSelect.value = "Quick Sort";
updateAlgorithmGuide("Quick Sort", "reviewing");
