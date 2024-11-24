
# To-Do API Documentation

This API allows users to manage their To-Do tasks, including creating, reading, updating, and deleting tasks.

---

## Base URL

```

https://my-todo-app-283967249469.asia-south1.run.app/api/todos/

```

---

## Endpoints

### 1. **List All To-Do Tasks**

**GET** `/api/todos/`

- **Description:** Retrieve a list of all To-Do tasks.
- **Response:**
  - Status: `200 OK`
  - Body:

    ```json
    [
        {
            "id": 1,
            "title": "Buy groceries",
            "description": "Milk, Eggs, Bread",
            "completed": false,
            "created_at": "2024-11-23T10:00:00Z"
        },
        ...
    ]
    ```

---

### 2. **Add a New To-Do Task**

**POST** `/api/todos/`

- **Description:** Create a new To-Do task.
- **Request Body:**

  ```json
  {
      "title": "Buy groceries",
      "description": "Milk, Eggs, Bread",
      "completed": false
  }
  ```

- **Response:**
  - Status: `201 Created`
  - Body:

    ```json
    {
        "id": 1,
        "title": "Buy groceries",
        "description": "Milk, Eggs, Bread",
        "completed": false,
        "created_at": "2024-11-23T10:00:00Z"
    }
    ```

- **Error Response:**
  - Status: `400 Bad Request`
  - Body:

    ```json
    {
        "title": ["This field is required."]
    }
    ```

---

### 3. **Delete All To-Do Tasks**

**DELETE** `/api/todos/`

- **Description:** Delete all tasks from the To-Do list.
- **Response:**
  - Status: `204 No Content`
  - Body:

    ```json
    {
        "message": "All tasks deleted"
    }
    ```

---

### 4. **Retrieve a Single To-Do Task**

**GET** `/api/todos/<id>/`

- **Description:** Retrieve a specific task by its ID.
- **Response:**
  - Status: `200 OK`
  - Body:

    ```json
    {
        "id": 1,
        "title": "Buy groceries",
        "description": "Milk, Eggs, Bread",
        "completed": false,
        "created_at": "2024-11-23T10:00:00Z"
    }
    ```

- **Error Response:**
  - Status: `404 Not Found`
  - Body:

    ```json
    {
        "error": "Task not found"
    }
    ```

---

### 5. **Update a Specific To-Do Task**

**PUT** `/api/todos/<id>/`

- **Description:** Update the details of a specific task.
- **Request Body:**

  ```json
  {
      "title": "Buy groceries",
      "description": "Milk, Eggs, Bread, Butter",
      "completed": true
  }
  ```

- **Response:**
  - Status: `200 OK`
  - Body:

    ```json
    {
        "id": 1,
        "title": "Buy groceries",
        "description": "Milk, Eggs, Bread, Butter",
        "completed": true,
        "created_at": "2024-11-23T10:00:00Z"
    }
    ```

- **Error Response:**
  - Status: `400 Bad Request`
  - Body:

    ```json
    {
        "title": ["This field is required."]
    }
    ```

  - Status: `404 Not Found`
  - Body:

    ```json
    {
        "error": "Task not found"
    }
    ```

---

### 6. **Delete a Specific To-Do Task**

**DELETE** `/api/todos/<id>/`

- **Description:** Delete a task by its ID.
- **Response:**
  - Status: `204 No Content`
  - Body:

    ```json
    {
        "message": "Task deleted"
    }
    ```

- **Error Response:**
  - Status: `404 Not Found`
  - Body:

    ```json
    {
        "error": "Task not found"
    }
    ```

---

## Models

### ToDo

| Field        | Type          | Description                          |
|--------------|---------------|--------------------------------------|
| `id`         | Integer       | Unique identifier for the task.      |
| `title`      | String        | Title of the task (max 255 chars).   |
| `description`| String (Text) | Optional description of the task.    |
| `completed`  | Boolean       | Status of the task (default: false). |
| `created_at` | DateTime      | Auto-generated timestamp.            |

---

## Example Errors

### Validation Error

**POST** `/api/todos/`

```json
{
    "completed": true
}
```

- **Response:**
  - Status: `400 Bad Request`
  - Body:

    ```json
    {
        "title": ["This field is required."]
    }
    ```

### Not Found Error

**GET** `/api/todos/999/`

- **Response:**
  - Status: `404 Not Found`
  - Body:

    ```json
    {
        "error": "Task not found"
    }
    ```

---

## Notes

- Replace `<id>` in the URL with the numeric ID of the desired To-Do task.
