import { useSelector } from "react-redux";

export const Navbar = () => {
  const { tasksList, error } = useSelector((state: any) => state.tasks);

  return (
    <div className="text-center">
      <h1 className="text-primary my-4">Project Management</h1>
      <p className="lead">Currently {tasksList.length} task(s) pending</p>
      {error && <h5 className="text-danger">{error}</h5>}
    </div>
  );
};
