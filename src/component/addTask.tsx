import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTaskToServer } from "../slices/task-slice";

export const AddTask = () => {
  const dispatch = useDispatch<any>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = (e: any) => {
    e.preventDefault();
    if (title && description) {
      dispatch(addTaskToServer({ title, description }));
      setTitle("");
      setDescription("");
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Task Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <div className="text-end">
        <Button variant="primary" type="submit" onClick={addTask}>
          Add Task
        </Button>
      </div>
    </Form>
  );
};
