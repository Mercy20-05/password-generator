# Random Password Generator

A customizable, secure, and responsive Random Password Generator built with vanilla HTML5, CSS3, and JavaScript.

---

## 📌 Approach

### 1. Structure & Layout (`index.html`)
- Designed an intuitive UI centered around a primary card container.
- Provided a read-only input field accompanied by a copy button for user convenience.
- Integrated a range slider with a real-time numerical counter to adjust password length.
- Added toggle checkboxes for character categories: uppercase, lowercase, numbers, and symbols.

### 2. Styling & UX (`style.css`)
- Applied a modern slate dark theme using clean CSS custom properties (`:root`).
- Implemented accessible custom checkboxes and responsive button hover/active micro-interactions.
- Ensured feedback states (e.g., "Copied to clipboard!" and validation warnings) seamlessly appear without shifting layout elements.

### 3. Logic & Randomization (`script.js`)
- **Dynamic Pool Building:** Pools character sets according to active checkbox states.
- **Guarantee Diversity:** Guarantees that at least one character from every active category is added to the password string before filling out the remaining length.
- **Fisher-Yates Shuffle:** Applies the Fisher-Yates algorithm across the generated characters so that the guaranteed characters do not stay clustered at the beginning.
- **Edge-Case Validation:** Prevents generation and surfaces an inline alert message if the user unchecks all character sets.
- **Modern Clipboard API:** Uses `navigator.clipboard.writeText()` with a graceful fallback to `document.execCommand('copy')`.

---

## 🎯 Deliverables & Outcomes

| Requirement | Implementation Details |
| :--- | :--- |
| **Length Slider / Input** | HTML range input syncing dynamically with a numeric counter (`min: 4`, `max: 32`, default `14`). |
| **Checkboxes for Types** | 4 customizable checkboxes: Uppercase, Lowercase, Numbers, and Special Symbols. |
| **Display Container** | Clean, read-only input field where the final randomized string is displayed. |
| **Copy-to-Clipboard** | One-click button with visual notification ("Copied to clipboard!"). |
| **Error Handling** | Validates against empty selections and displays clear warnings. |

---

## 🚀 How to Run

1. Clone or download this project repository.
2. Ensure `index.html`, `style.css`, and `script.js` are in the same folder.
3. Open `index.html` in any modern web browser.