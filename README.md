
# 📜 U.S. Constitution & Civics Daily Quiz

### **The Vision**
This project was developed as a companion solution to [citizenconstitutionproject.org](https://citizenconstitutionproject.org). It stems from the observation that many Americans lack foundational knowledge about our Constitution and the founding of our country. 

By providing a low-friction, high-engagement way to learn, this app aims to foster a more informed citizenry—people equipped to make decisions based on **knowledge and historical fact** rather than presumptions.

---

### ** Project Overview**
A mobile-responsive, rapid-prototype application designed to gamify civic education. This app was built using an **Iterative AI-Assisted Development** workflow, moving from high-level conceptual requirements to functional logic and UI refinement.

### ** The Build Process (Iterative Prompts)**
To ensure the AI built a high-quality "chassis," I acted as the Product Lead, directing the AI through three stages of development:

**Stage 1: Foundation & Aesthetic**
> Build a mobile- friendly app that gives a daily quiz about the U.S. Constitution, U.S. civics, and U.S. history. It should have a progress bar that will keep their place even if they refresh the page, multiple-choice buttons, and a "fun fact" pop-up when you get the answer correct. For the multiple choice answers, use roman numerals to number them. Make the background look like parchment paper and use an older-looking font style that is easy to read, making sure that it has a good contrast from the background that will be easy to read even on a mobile device, perhaps "Georgia". Give a "hint" drop down button with a hint for each question. Give 10 sample questions pulling from the official U.S. Citizenship (civics) Test. Use the National Archives "Founding Documents" as the primary source. Store the questions in a JSon file so that they can be changed more easily later. Make the questions range from easy to difficult and give an immediate green check or red "X" indicating if they answered correctly or not. After the quiz, show a score sheet with the number they got correct and where their strengths/weaknesses are and suggest resources they can use to learn more.

**Stage 2: Logic Diagnostics**
> ok. This looks good, but it does not show a fun fact with the selection of the correct answer and also after the first question, a wrong answer and the correct answer are already selected. it needs to reset every time.

**Stage 3: UX Refinement**
> ok. can you have the fun fact come up whenever the correct answer is given also. For instance, when I choose the wrong answer and the correct answer is shown, give the fact then, too.

---

### ** Key Technical Features**
* **State Management:** Tracks user progress and score with persistence via `localStorage` (refresh-safe).
* **Educational Design:** Questions pulled from the official U.S. Citizenship (Civics) Test and vetted against National Archives data.
* **Accessible UI:** High-contrast "Georgia" serif typography on a parchment aesthetic for historical feel without sacrificing mobile readability.
* **JSON Integration:** Decoupled content from code, allowing for easy updates to the question bank.

### ** Tech Stack**
* **Build Tool:** Lovable / v0
* **Framework:** React / Tailwind CSS
* **Version Control:** GitHub
* **Live Deployment:** [INSERT YOUR LIVE LINK HERE]
