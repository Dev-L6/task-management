This app allows you to manage tasks using **Redux Toolkit** for state management.

## Features

- **Create Tasks**: Add new tasks to your task list.
- **Edit Tasks**: Edit the details of existing tasks.
- **Delete Tasks**: Remove tasks from the list with a confirmation modal.
- **Reordering Tasks**: Drag and drop tasks to reorder them.
- **Search Tasks**: Filter tasks by title.
- **Task Details**: View the details of any task, including title, description, and due date.

## Redux Toolkit State Management

The app uses **Redux Toolkit** to manage the state of tasks. The main actions are:

- **`fetchTodo`**: Fetches the list of tasks.
- **`addTask`**: Adds a new task.
- **`editTask`**: Updates an existing task.
- **`deleteTask`**: Deletes a task.
- **`markAsDone`**: Marks a task as "Done".
- **`setFilter`**: Filters tasks by status (All, To Do, Done, Overdue).
- **`searchTask`**: Filters tasks by title.
- **`updateTaskOrder`**: Updates the order of tasks after they are reordered via drag-and-drop.
- 




#To run app 
- ** cd task-management => npm run dev **
