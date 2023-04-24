import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Dialog } from "./dialog";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Task, setSelectedTask, getTasksFromServer, deleteTaskFromServer } from "../slices/task-slice";

export const Result = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch<any>();

  const updateTask = (task: Task) => {
    dispatch(setSelectedTask(task));
    setModalShow(true);
  };

  const deleteTask = (task: Task) => {
    dispatch(deleteTaskFromServer(task.id as number))
  };

  useEffect(() => {
    dispatch(getTasksFromServer())
  }, [dispatch]);

  const { tasksList } = useSelector((state: any) => state.tasks);

  return (
    <>
      <Table striped bordered hover className="my-4">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Task</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasksList &&
            tasksList.map((task: Task, index: number) => (
              <tr className="text-center" key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <Button
                    variant="primary"
                    className="mx-4"
                    onClick={() => updateTask(task)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button variant="primary" onClick={() => deleteTask(task)}>
                    <i className="bi bi-trash3"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Dialog show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};
