# 🧭 Event Delegation in JavaScript

## 📌 What is Event Delegation?

**Event Delegation** is a technique where a **single event listener** is attached to a **parent element**, which monitors and handles events triggered by its **child elements** using event bubbling.

Instead of assigning event listeners to multiple child elements individually, we delegate the responsibility to a common ancestor, making the code more efficient and scalable.

---

## 🤔 Why Use Event Delegation?

✅ **Better Performance**  
- Fewer event listeners → Lower memory usage  
- Especially useful when handling many elements (like list items, table rows, etc.)

✅ **Dynamic Element Support**  
- Automatically handles elements added **after** the initial page load  
- No need to reattach listeners when new elements are created

✅ **Simplified Code Maintenance**  
- Centralized event handling logic  
- Avoids repetitive listener setup