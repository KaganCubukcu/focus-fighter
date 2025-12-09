from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import game

app = FastAPI(title="Focus Fighter API")

# CORS Configuration
origins = [
    "http://localhost:3000",  # Next.js Frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(game.router)

@app.get("/")
def read_root():
    return {"message": "Focus Fighter API is ready to fight!"}
