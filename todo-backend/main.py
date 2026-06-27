from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
import uuid

app = FastAPI(title="DIRFT Todo API", version="1.0.0")

# Enable CORS for Angular frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Data Models ---
class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100, description="Task title")
    completed: bool = Field(default=False, description="Task completion status")


class TodoCreate(TodoBase):
    pass


class TodoResponse(TodoBase):
    id: str


# --- In-Memory Database Simulation ---
# Using a dict for O(1) lookups
TODO_DB: dict[str, TodoResponse] = {}


# --- REST Endpoints ---
@app.get("/api/todos", response_model=List[TodoResponse], status_code=status.HTTP_200_OK)
async def get_todos():
    return list(TODO_DB.values())


@app.post("/api/todos", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo(todo_in: TodoCreate):
    todo_id = str(uuid.uuid4())
    new_todo = TodoResponse(id=todo_id, **todo_in.model_dump())
    TODO_DB[todo_id] = new_todo
    return new_todo


@app.put("/api/todos/{todo_id}", response_model=TodoResponse)
async def update_todo(todo_id: str, todo_in: TodoCreate):
    if todo_id not in TODO_DB:
        raise HTTPException(status_code=404, detail="Todo item not found")

    updated_todo = TodoResponse(id=todo_id, **todo_in.model_dump())
    TODO_DB[todo_id] = updated_todo
    return updated_todo


@app.delete("/api/todos/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: str):
    if todo_id not in TODO_DB:
        raise HTTPException(status_code=404, detail="Todo item not found")
    del TODO_DB[todo_id]
    return None


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)