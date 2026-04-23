import { useState, useEffect } from "react";

const STORAGE_KEY = "recursive-java-completed";

const problems = [
  {
    id: 1,
    level: "🟢 Easy",
    title: "Factorial",
    desc: "เขียน method หา factorial ของจำนวนเต็มบวก n\nเช่น factorial(5) = 5 × 4 × 3 × 2 × 1 = 120",
    examples: [
      { input: "factorial(0)", output: "1" },
      { input: "factorial(5)", output: "120" },
      { input: "factorial(10)", output: "3628800" },
    ],
    hint: "Base case: n == 0 → return 1\nRecursive case: n * factorial(n - 1)",
    solution: `public static int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}`,
  },
  {
    id: 2,
    level: "🟢 Easy",
    title: "Sum of Digits",
    desc: "เขียน method หาผลรวมของตัวเลขแต่ละหลักของจำนวนเต็มบวก n\nเช่น sumDigits(1234) = 1 + 2 + 3 + 4 = 10",
    examples: [
      { input: "sumDigits(123)", output: "6" },
      { input: "sumDigits(9999)", output: "36" },
      { input: "sumDigits(5)", output: "5" },
    ],
    hint: "Base case: n < 10 → return n\nRecursive case: (n % 10) + sumDigits(n / 10)",
    solution: `public static int sumDigits(int n) {
    if (n < 10) return n;
    return (n % 10) + sumDigits(n / 10);
}`,
  },
  {
    id: 3,
    level: "🟢 Easy",
    title: "Power (x^n)",
    desc: "เขียน method คำนวณ x ยกกำลัง n โดยที่ n >= 0",
    examples: [
      { input: "power(2, 10)", output: "1024" },
      { input: "power(3, 0)", output: "1" },
      { input: "power(5, 3)", output: "125" },
    ],
    hint: "Base case: n == 0 → return 1\nRecursive case: x * power(x, n - 1)",
    solution: `public static long power(int x, int n) {
    if (n == 0) return 1;
    return x * power(x, n - 1);
}`,
  },
  {
    id: 4,
    level: "🟡 Medium",
    title: "Fibonacci",
    desc: "เขียน method หาค่า Fibonacci ลำดับที่ n\nF(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)",
    examples: [
      { input: "fib(0)", output: "0" },
      { input: "fib(6)", output: "8" },
      { input: "fib(10)", output: "55" },
    ],
    hint: "Base case: n <= 1 → return n\nRecursive case: fib(n-1) + fib(n-2)\n💡 ลองคิดว่าทำไม method นี้ช้ามากเมื่อ n มีค่ามาก?",
    solution: `public static int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}`,
  },
  {
    id: 5,
    level: "🟡 Medium",
    title: "Reverse String",
    desc: "เขียน method กลับ String โดยใช้ recursion\nห้ามใช้ StringBuilder.reverse()",
    examples: [
      { input: 'reverse("hello")', output: '"olleh"' },
      { input: 'reverse("Java")', output: '"avaJ"' },
      { input: 'reverse("a")', output: '"a"' },
    ],
    hint: 'Base case: str.length() <= 1 → return str\nRecursive case: ตัวสุดท้าย + reverse(ส่วนที่เหลือ)\nใช้ str.charAt() และ str.substring()',
    solution: `public static String reverse(String str) {
    if (str.length() <= 1) return str;
    return str.charAt(str.length() - 1)
         + reverse(str.substring(0, str.length() - 1));
}`,
  },
  {
    id: 6,
    level: "🟡 Medium",
    title: "Palindrome Check",
    desc: "เขียน method ตรวจสอบว่า String เป็น palindrome หรือไม่\n(อ่านจากหน้าไปหลังและหลังไปหน้าได้เหมือนกัน)",
    examples: [
      { input: 'isPalindrome("racecar")', output: "true" },
      { input: 'isPalindrome("hello")', output: "false" },
      { input: 'isPalindrome("aba")', output: "true" },
    ],
    hint: "Base case: str.length() <= 1 → return true\nRecursive case: ตัวแรก == ตัวสุดท้าย && isPalindrome(ตัดตัวแรกและตัวสุดท้ายออก)",
    solution: `public static boolean isPalindrome(String str) {
    if (str.length() <= 1) return true;
    if (str.charAt(0) != str.charAt(str.length() - 1))
        return false;
    return isPalindrome(
        str.substring(1, str.length() - 1)
    );
}`,
  },
  {
    id: 7,
    level: "🟡 Medium",
    title: "Binary Search (Recursive)",
    desc: "เขียน method ค้นหาค่าใน sorted array ด้วย Binary Search แบบ recursive\nreturn index ที่พบ หรือ -1 ถ้าไม่พบ",
    examples: [
      { input: "search([1,3,5,7,9], 5)", output: "2" },
      { input: "search([1,3,5,7,9], 6)", output: "-1" },
      { input: "search([2,4,6,8], 8)", output: "3" },
    ],
    hint: "ใช้ helper method ที่รับ low, high เพิ่มเติม\nBase case: low > high → return -1\nเทียบ target กับ arr[mid] แล้วเลือกครึ่งซ้ายหรือขวา",
    solution: `public static int search(int[] arr, int target) {
    return binarySearch(arr, target, 0, arr.length - 1);
}

private static int binarySearch(int[] arr, int target,
                                 int low, int high) {
    if (low > high) return -1;
    int mid = (low + high) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target)
        return binarySearch(arr, target, mid + 1, high);
    return binarySearch(arr, target, low, mid - 1);
}`,
  },
  {
    id: 8,
    level: "🔴 Hard",
    title: "Tower of Hanoi",
    desc: "เขียน method แสดงขั้นตอนการย้ายจาน n ใบ จากเสา A ไปเสา C\nโดยใช้เสา B เป็นตัวช่วย\nกฎ: ย้ายได้ทีละ 1 จาน, ห้ามวางจานใหญ่ทับจานเล็ก",
    examples: [
      { input: "hanoi(2, 'A', 'C', 'B')", output: "A→C, A→B... (ไม่ต้องสนใจ)" },
      { input: "hanoi(3, 'A', 'C', 'B')", output: "7 moves total" },
    ],
    hint: "1. ย้าย n-1 จานบนสุดจาก source → helper\n2. ย้ายจานล่างสุดจาก source → target\n3. ย้าย n-1 จานจาก helper → target",
    solution: `public static void hanoi(int n, char from,
                          char to, char helper) {
    if (n == 1) {
        System.out.println(from + " → " + to);
        return;
    }
    hanoi(n - 1, from, helper, to);
    System.out.println(from + " → " + to);
    hanoi(n - 1, helper, to, from);
}`,
  },
  {
    id: 9,
    level: "🔴 Hard",
    title: "Generate Permutations",
    desc: "เขียน method สร้าง permutation ทั้งหมดของ String ที่กำหนด\nเช่น input \"abc\" จะได้ทั้งหมด 6 แบบ",
    examples: [
      { input: 'permute("ab")', output: '["ab", "ba"]' },
      { input: 'permute("abc")', output: '["abc","acb","bac","bca","cab","cba"]' },
    ],
    hint: "สำหรับแต่ละตัวอักษร:\n- ดึงตัวนั้นออกมาเป็น prefix\n- หา permutation ของตัวที่เหลือ\n- เอา prefix ต่อหน้าแต่ละ permutation",
    solution: `public static List<String> permute(String str) {
    List<String> result = new ArrayList<>();
    if (str.length() <= 1) {
        result.add(str);
        return result;
    }
    for (int i = 0; i < str.length(); i++) {
        char ch = str.charAt(i);
        String rest = str.substring(0, i)
                    + str.substring(i + 1);
        for (String perm : permute(rest)) {
            result.add(ch + perm);
        }
    }
    return result;
}`,
  },
  {
    id: 10,
    level: "🔴 Hard",
    title: "Merge Sort",
    desc: "เขียน Merge Sort แบบ recursive เพื่อ sort array\nแบ่ง array ออกเป็นครึ่ง → sort แต่ละครึ่ง → merge กลับ",
    examples: [
      { input: "mergeSort([5,2,8,1,9])", output: "[1,2,5,8,9]" },
      { input: "mergeSort([3,1])", output: "[1,3]" },
    ],
    hint: "1. Base case: array.length <= 1 → return\n2. แบ่ง array เป็น left และ right\n3. mergeSort(left), mergeSort(right)\n4. merge สอง sorted arrays กลับเป็นหนึ่ง",
    solution: `public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left = mergeSort(
        Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(
        Arrays.copyOfRange(arr, mid, arr.length));
    return merge(left, right);
}

private static int[] merge(int[] a, int[] b) {
    int[] result = new int[a.length + b.length];
    int i = 0, j = 0, k = 0;
    while (i < a.length && j < b.length)
        result[k++] = a[i] <= b[j] ? a[i++] : b[j++];
    while (i < a.length) result[k++] = a[i++];
    while (j < b.length) result[k++] = b[j++];
    return result;
}`,
  },
];

const levelClasses = {
  "🟢 Easy": {
    badge: "bg-[#0d2818] border border-[#1a5c2e] text-green-400",
    icon: "bg-[#0d2818] border border-[#1a5c2e] text-green-400",
    text: "text-green-400",
    hoverBorder: "#1a5c2e",
  },
  "🟡 Medium": {
    badge: "bg-[#2d2205] border border-[#5c4a0a] text-yellow-400",
    icon: "bg-[#2d2205] border border-[#5c4a0a] text-yellow-400",
    text: "text-yellow-400",
    hoverBorder: "#5c4a0a",
  },
  "🔴 Hard": {
    badge: "bg-[#2d0a0a] border border-[#5c1a1a] text-red-400",
    icon: "bg-[#2d0a0a] border border-[#5c1a1a] text-red-400",
    text: "text-red-400",
    hoverBorder: "#5c1a1a",
  },
};

const FONT_MONO = { fontFamily: "'JetBrains Mono', 'Fira Code', monospace" };
const FONT_THAI = { fontFamily: "'Noto Sans Thai', sans-serif" };
const FONT_THAI_MONO = { fontFamily: "'Noto Sans Thai', monospace" };

export default function RecursivePractice() {
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState({});
  const [showSolution, setShowSolution] = useState({});
  const [completed, setCompleted] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCompleted(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  }, [completed, loaded]);

  const toggleHint = (id) => setShowHint((p) => ({ ...p, [id]: !p[id] }));
  const toggleSolution = (id) => setShowSolution((p) => ({ ...p, [id]: !p[id] }));
  const toggleComplete = (id) =>
    setCompleted((p) => ({ ...p, [id]: !p[id] }));

  const total = problems.length;
  const done = Object.values(completed).filter(Boolean).length;

  if (!loaded) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#666] flex items-center justify-center" style={FONT_MONO}>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Noto+Sans+Thai:wght@400;600;700&display=swap" rel="stylesheet" />
        กำลังโหลดข้อมูล...
      </div>
    );
  }

  if (selected !== null) {
    const p = problems.find((x) => x.id === selected);
    const lc = levelClasses[p.level];
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#e2e2e8] p-6 py-10" style={FONT_MONO}>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Noto+Sans+Thai:wght@400;600;700&display=swap" rel="stylesheet" />

        <button
          onClick={() => setSelected(null)}
          className="bg-transparent border border-[#333] text-[#888] px-4 py-2 rounded-md cursor-pointer mb-5 text-[13px]"
          style={FONT_MONO}
        >
          ← กลับหน้ารวม
        </button>

        <div className="max-w-[720px] mx-auto">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className={`${lc.badge} px-3 py-1 rounded-full text-[12px] font-semibold`}>
              {p.level}
            </span>
            <span className="text-[#555] text-[13px]">#{p.id}</span>
          </div>

          <h1 className="text-[28px] font-bold mt-2 mb-4 text-white" style={FONT_THAI}>
            {p.title}
          </h1>

          <div className="bg-[#12121a] border border-[#1e1e2e] rounded-[10px] p-5 mb-5">
            <p className="whitespace-pre-wrap leading-[1.7] text-[#c8c8d0] m-0 text-[14px]" style={FONT_THAI_MONO}>
              {p.desc}
            </p>
          </div>

          <div className="mb-5">
            <h3 className="text-[#7c7cff] text-[13px] uppercase tracking-[1.5px] mb-[10px]">
              ▸ ตัวอย่าง
            </h3>
            {p.examples.map((ex, i) => (
              <div key={i} className="flex gap-2 items-center mb-[6px] flex-wrap">
                <code className="bg-[#1a1a28] px-3 py-[6px] rounded-md text-[13px] text-violet-400">
                  {ex.input}
                </code>
                <span className="text-[#444]">→</span>
                <code className="bg-[#0d2818] px-3 py-[6px] rounded-md text-[13px] text-green-400">
                  {ex.output}
                </code>
              </div>
            ))}
          </div>

          <div className="flex gap-[10px] mb-5 flex-wrap">
            <button
              onClick={() => toggleHint(p.id)}
              className={`${showHint[p.id] ? "bg-[#2a2a3a]" : "bg-[#16161f]"} border border-[#2a2a3a] text-yellow-400 px-5 py-[10px] rounded-lg cursor-pointer text-[13px] font-semibold`}
              style={FONT_THAI_MONO}
            >
              {showHint[p.id] ? "🙈 ซ่อน Hint" : "💡 ดู Hint"}
            </button>
            <button
              onClick={() => toggleSolution(p.id)}
              className={`${showSolution[p.id] ? "bg-[#2a2a3a]" : "bg-[#16161f]"} border border-[#2a2a3a] text-red-400 px-5 py-[10px] rounded-lg cursor-pointer text-[13px] font-semibold`}
              style={FONT_THAI_MONO}
            >
              {showSolution[p.id] ? "🙈 ซ่อน Solution" : "🔑 ดู Solution"}
            </button>
            <button
              onClick={() => toggleComplete(p.id)}
              className={`border px-5 py-[10px] rounded-lg cursor-pointer text-[13px] font-semibold ${completed[p.id] ? "bg-[#0d2818] border-[#1a5c2e] text-green-400" : "bg-[#16161f] border-[#2a2a3a] text-[#888]"}`}
              style={FONT_THAI_MONO}
            >
              {completed[p.id] ? "✅ ทำแล้ว!" : "☐ มาร์คว่าทำแล้ว"}
            </button>
          </div>

          {showHint[p.id] && (
            <div className="bg-[#1c1c10] border border-[#3d3d1a] rounded-[10px] px-5 py-4 mb-4">
              <div className="text-yellow-400 text-[12px] font-bold mb-2 uppercase tracking-[1px]">
                💡 Hint
              </div>
              <pre className="m-0 whitespace-pre-wrap text-[#d4d4a0] text-[13px] leading-[1.6]" style={FONT_MONO}>
                {p.hint}
              </pre>
            </div>
          )}

          {showSolution[p.id] && (
            <div className="bg-[#1a0a0a] border border-[#3d1a1a] rounded-[10px] px-5 py-4 mb-4">
              <div className="text-red-400 text-[12px] font-bold mb-2 uppercase tracking-[1px]">
                🔑 Solution
              </div>
              <pre className="m-0 whitespace-pre-wrap text-[#e8c8c8] text-[13px] leading-[1.6] overflow-x-auto" style={FONT_MONO}>
                {p.solution}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e2e2e8] p-6 py-10" style={FONT_MONO}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Noto+Sans+Thai:wght@400;600;700&display=swap" rel="stylesheet" />

      <div className="max-w-[720px] mx-auto">
        <div className="text-center mb-8">
          <div className="text-[40px] mb-2">🔄</div>
          <h1 className="text-[26px] font-bold text-white m-0 mb-[6px]" style={FONT_THAI}>
            Recursive Practice — Java
          </h1>
          <p className="text-[#666] text-[13px] m-0" style={FONT_THAI_MONO}>
            ฝึกเขียน recursion ทั้งหมด {total} ข้อ
          </p>

          <div className="mt-4 bg-[#12121a] rounded-[10px] px-5 py-3 inline-flex items-center gap-3 border border-[#1e1e2e]">
            <span className="text-[#888] text-[12px]" style={FONT_THAI_MONO}>
              ทำไปแล้ว
            </span>
            <div className="w-[120px] h-[6px] bg-[#1e1e2e] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full transition-[width] duration-[400ms]"
                style={{ width: `${(done / total) * 100}%` }}
              />
            </div>
            <span className="text-green-400 text-[13px] font-bold">
              {done}/{total}
            </span>
            {done > 0 && (
              <button
                onClick={() => { if (confirm("รีเซ็ตความก้าวหน้าทั้งหมด?")) setCompleted({}); }}
                className="bg-transparent border border-[#333] text-[#666] px-[10px] py-[3px] rounded cursor-pointer text-[11px]"
                style={FONT_THAI_MONO}
              >
                รีเซ็ต
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          {problems.map((p) => {
            const lc = levelClasses[p.level];
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`bg-[#12121a] border rounded-[10px] px-5 py-4 cursor-pointer text-left transition-all duration-200 flex items-center gap-4 hover:bg-[#1a1a28] ${completed[p.id] ? "border-[#1a5c2e]" : "border-[#1e1e2e]"}`}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = lc.hoverBorder; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = completed[p.id] ? "#1a5c2e" : "#1e1e2e"; }}
              >
                <div className={`w-9 h-9 rounded-lg ${lc.icon} flex items-center justify-center text-[14px] font-bold shrink-0`}>
                  {completed[p.id] ? "✓" : p.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-semibold text-white mb-[2px]" style={FONT_THAI}>
                    {p.title}
                  </div>
                  <div className={`text-[11px] ${lc.text}`}>{p.level}</div>
                </div>
                <span className="text-[#333] text-[18px]">›</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
