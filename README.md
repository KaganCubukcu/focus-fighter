# ⚔️ Focus Fighter

**Focus Fighter** is a gamified productivity app that turns your Pomodoro sessions into epic battles. Defeat monsters, earn XP, and level up by staying focused!

> **⚠️ Note:** The backend is hosted on Render Free Tier. The initial request (XP calculation) may take up to **50 seconds** to wake up the server. Please be patient!

🔗 **Live Demo:**
- **Frontend:** [Vercel App](https://focus-fighter.vercel.app)
- **Backend Docs:** [Render Swagger UI](https://focus-fighter.onrender.com/docs)

## 🚀 Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Python (FastAPI)
- **Key Features:**
  - 🍅 **Gamified Timer:** Focus to deal damage to monsters.
  - 👾 **Visual Battles:** Animated monsters react to your progress.
  - 📈 **Progression System:** Earn XP and level up based on focus duration.

## 🛠️ Getting Started

### Prerequisites
- Node.js & npm
- Python 3.10+

### Installation

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/kagancubukcu/focus-fighter.git
    cd focus-fighter
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```

3.  **Frontend Setup:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Fight!**
    Open [http://localhost:3000](http://localhost:3000) and start focusing.
