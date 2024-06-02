import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SegmentedProgressBar from "./segmentedProgressBar";
import editIcon from "../images/edit.svg";
import deleteIcon from "../images/Delete.svg";
import completedIcon from "../images/completed.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // State variables to manage tasks and their properties
  const [tasks, setTasks] = useState(() => {
    // Load tasks from local storage or initialize empty tasks if not available
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks
      ? JSON.parse(storedTasks)
      : {
          todo: [],
          inProgress: [],
          inReview: [],
          completed: [],
        };
  });
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [selectedCategory] = useState("todo");
  const [edit, setEdit] = useState(); // State to manage editing mode
  const [editID, setEditID] = useState(); // State to store the ID of the task being edited
  const [id, setid] = useState(1); // State to manage task IDs
  const [editTitle, seteditTitle] = useState(""); // State to manage edited task title
  const [editDesc, seteditDesc] = useState(""); // State to manage edited task description
  const [editCategory, setEditCategory] = useState(""); // State to manage edited task category

  const navigate = useNavigate();

  useEffect(() => {
    // Save tasks to local storage whenever they change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to generate a random ID
  const generateID = () => {
    return uuidv4(); // Generate a unique ID
  };

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (newDesc.trim() && newTitle.trim()) {
      // Add new task to the selected category
      setTasks((prevTasks) => ({
        ...prevTasks,
        [selectedCategory]: [
          ...prevTasks[selectedCategory],
          {
            title: newTitle,
            description: newDesc,
            id: generateID(),
            status: selectedCategory,
          },
        ],
      }));
      setNewDesc(""); // Clear the new task description
      setNewTitle(""); // Clear the new task title
      setOpen(!open);
    }
  };

  // Function to handle saving an edited task
  const handleSaveTask = (prevCategory) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      const prevCategoryTasks = [...updatedTasks[prevCategory]];
      const taskIndex = prevCategoryTasks.findIndex(
        (task) => task.id === editID
      );
      let taskID = prevCategoryTasks.filter((task) => task.id === editID);

      taskID = taskID && taskID.length > 0 ? taskID[0] : generateID();

      if (taskIndex !== -1) {
        if (prevCategory !== editCategory) {
          // Move task to a different category
          prevCategoryTasks.splice(taskIndex, 1);
          updatedTasks[prevCategory] = prevCategoryTasks;
          updatedTasks[editCategory] = [
            ...updatedTasks[editCategory],
            {
              ...prevCategoryTasks[taskIndex],
              id: taskID,
              title: editTitle,
              description: editDesc,
              status: editCategory,
            },
          ];
        } else {
          // Update task details
          prevCategoryTasks[taskIndex] = {
            ...prevCategoryTasks[taskIndex],
            id: taskID,
            title: editTitle,
            description: editDesc,
            status: editCategory,
          };
          updatedTasks[prevCategory] = prevCategoryTasks;
        }
      }

      return updatedTasks;
    });

    // Reset states after saving task
    if (prevCategory !== editCategory) {
      setEditCategory(""); // Clear editCategory
    }
    setEdit(false); // Disable edit mode
    setEditID(null); // Clear editID
  };

  // Function to handle editing a task
  const handleEdit = (task, category) => {
    setEdit(true); // Enable edit mode
    setEditID(task.id); // Set the ID of the task being edited
    setEditCategory(category); // Set the category of the task being edited
    seteditTitle(task.title); // Set the title of the task being edited
    seteditDesc(task.description); // Set the description of the task being edited
  };

  // Function to handle deleting a task
  const handleDelete = (taskID, category) => {
    setTasks((prevTasks) => {
      debugger;
      const updatedTasks = { ...prevTasks };
      updatedTasks[category] = updatedTasks[category]?.filter(
        (task) => task.id !== taskID
      );
      return updatedTasks;
    });
  };

  return (
    <div className="bg-[#f4f3fe] flex flex-row justify-center w-full">
      <div className="bg-[#f4f3fe] w-[1512px] h-[982px]">
        <div className="inline-flex flex-col items-center gap-[60px] relative top-[55px] left-16">
          <div className="inline-flex flex-col items-start justify-center gap-1 relative flex-[0_0_auto]">
            <div className="flex w-[1357px] items-center justify-between relative flex-[0_0_auto]">
              <div className="mb-4">
                <h1 className="relative text-6xl font-semibold mt-[-0.07px]">
                  Hello,{" "}
                  <span className="text-[#7f27ff]">
                    {localStorage.getItem("name")}
                  </span>
                </h1>
              </div>
              <div className="inline-flex items-start gap-4 relative flex-[0_0_auto]">
                <button
                  id="dropdownUserAvatarButton"
                  data-dropdown-toggle="dropdownAvatar"
                  class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  type="button"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="relative w-[50px] h-[50px] rounded-full"
                    src="https://c.animaapp.com/AahFQzfZ/img/unsplash-pata8xe-ivm@2x.png"
                    alt="user photo"
                  />
                </button>

                <div
                  id="dropdownAvatar"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{localStorage.getItem("name")}</div>
                  </div>
                  <div class="py-2">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={() => {
                        localStorage.removeItem("tasks");
                        localStorage.removeItem("name");
                        navigate("/");
                      }}
                    >
                      Log out
                    </a>
                  </div>
                </div>

                {/* <div className="relative w-[50px] h-[50px] rounded-[79px] border border-solid border-transparent [border-image:linear-gradient(to_bottom,rgb(131,113,241),rgb(99,76,238),rgb(102,102,102)_100.01%)_1] bg-[url(https://c.animaapp.com/AahFQzfZ/img/unsplash-pata8xe-ivm@2x.png)] bg-[100%_100%]" /> */}
              </div>
            </div>
            <p className="relative w-[707px] [font-family:'Spartan',Helvetica] font-medium text-[#7d7d7d] text-base tracking-[0] leading-[normal]">
              Seamlessly organize your tasks with TodoSync. Effortlessly manage
              your to-dos, track progress, and stay productive
            </p>
          </div>
          <SegmentedProgressBar tasks={tasks} />
          <div className="relative w-[1384px] h-[697px]">
            <div className="inline-flex flex-col items-start gap-9 absolute top-0 left-0">
              <div className="flex w-[146px] items-center justify-center gap-2.5 px-6 py-3.5 relative flex-[0_0_auto] bg-[#7f27ff] rounded-[86px]">
                <img
                  className="relative w-4 h-4"
                  alt="List"
                  src="https://c.animaapp.com/AahFQzfZ/img/list.svg"
                />
                <div className="relative w-[72px] h-[13px]">
                  <div className="absolute h-4 -top-px left-0 [font-family:'Spartan',Helvetica] font-medium text-white text-sm tracking-[0] leading-[normal] whitespace-nowrap">
                    To Do List
                  </div>
                </div>
              </div>
              <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto] border-r-2 pr-5">
                <div className="flex flex-col w-[316px] items-start gap-6 px-[27px] py-4 relative flex-[0_0_auto] bg-white rounded-2xl overflow-hidden border border-solid border-[#7f27ff] shadow-[0px_1px_1px_#c7c7c712,0px_2px_2px_#c7c7c70f,0px_5px_3px_#c7c7c70a,0px_9px_3px_#c7c7c703,0px_13px_4px_transparent]">
                  <div
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer flex w-[262px] items-center justify-center gap-3 px-px py-0 relative flex-[0_0_auto]"
                  >
                    <img
                      className="relative w-5 h-5"
                      alt="Add"
                      src="https://c.animaapp.com/AahFQzfZ/img/add.svg"
                    />
                    <div className="relative w-[88px] h-4">
                      <div className="absolute h-5 -top-px left-0 [font-family:'Spartan',Helvetica] font-medium text-[#7f27ff] text-lg tracking-[0] leading-[normal] whitespace-nowrap">
                        Add Task
                      </div>
                    </div>
                  </div>
                  {open && (
                    <>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none"
                        placeholder="New task title"
                      />
                      <textarea
                        rows={3}
                        type="text"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none"
                        placeholder="New task description"
                      />
                      <select
                        disabled
                        value={selectedCategory}
                        // onChange={(e) => set(e.target.value)}
                        className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none mt-2"
                      >
                        <option value="todo">To Do</option>
                        <option value="inProgress">In Progress</option>
                        <option value="inReview">In Review</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        onClick={handleAddTask}
                        className="w-full mt-2 py-2 bg-[#7f27ff] text-white rounded-lg"
                      >
                        Add Task
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="inline-flex flex-col-reverse items-start gap-4 relative flex-[0_0_auto] border-r-2 pr-5 min-w-min">
                {tasks.todo.map((task) => {
                  return (
                    <div key={task.id}>
                      {edit && editID == task.id ? (
                        <>
                          <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                            <div className="flex flex-col w-[316px] items-start gap-6 px-[27px] py-4 relative flex-[0_0_auto] bg-white rounded-2xl overflow-hidden border border-solid border-[#7f27ff] shadow-[0px_1px_1px_#c7c7c712,0px_2px_2px_#c7c7c70f,0px_5px_3px_#c7c7c70a,0px_9px_3px_#c7c7c703,0px_13px_4px_transparent]">
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => seteditTitle(e.target.value)}
                                className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none"
                                placeholder="New task title"
                              />
                              <textarea
                                rows={3}
                                type="text"
                                value={editDesc}
                                onChange={(e) => seteditDesc(e.target.value)}
                                className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none"
                                placeholder="New task description"
                              />
                              <select
                                value={editCategory}
                                onChange={(e) =>
                                  setEditCategory(e.target.value)
                                }
                                className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none mt-2"
                              >
                                <option value="todo">To Do</option>
                                <option value="inProgress">In Progress</option>
                                <option value="inReview">In Review</option>
                                <option value="completed">Completed</option>
                              </select>
                              <div className="w-full flex gap-2">
                                <button
                                  onClick={() => handleSaveTask("todo")}
                                  className="w-2/3 py-2 bg-[#7f27ff] text-white rounded-lg"
                                >
                                  Save Task
                                </button>
                                <button
                                  onClick={() => {
                                    setEdit(false);
                                    setEditID();
                                    setEditCategory("");
                                    setNewDesc("");
                                    seteditTitle("");
                                  }}
                                  className="w-1/3 py-2 bg-[#fe7a36] text-white rounded-lg"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          key={task.id}
                          className="flex flex-col w-[316px] items-start gap-6 px-[27px] py-6 relative flex-[0_0_auto] bg-white rounded-3xl overflow-hidden shadow-[0px_1px_1px_#c7c7c712,0px_2px_2px_#c7c7c70f,0px_5px_3px_#c7c7c70a,0px_9px_3px_#c7c7c703,0px_13px_4px_transparent]"
                        >
                          <div className="flex w-[262px] items-center justify-between px-px py-0 relative flex-[0_0_auto]">
                            <div className="relative w-11 h-[21px] mt-[-1.00px] [font-family:'Spartan',Helvetica] font-medium text-[#7f27ff] text-lg tracking-[0] leading-[normal] whitespace-nowrap">
                              {task.title}
                            </div>
                            <div className="flex gap-2">
                              <img
                                className="relative flex-[0_0_auto] cursor-pointer"
                                alt="Frame"
                                src={deleteIcon}
                                onClick={() => handleDelete(task.id, "todo")}
                              />
                              <img
                                className="relative flex-[0_0_auto] cursor-pointer"
                                alt="Frame"
                                src={editIcon}
                                onClick={() => handleEdit(task, "todo")}
                              />
                            </div>
                          </div>
                          <p className="relative w-[261px] [font-family:'Spartan',Helvetica] font-medium text-[#303030] text-base tracking-[0] leading-[normal]">
                            {task.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="inline-flex flex-col items-start gap-9 absolute top-0 left-[356px] w-[356px]">
              <div className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 relative flex-[0_0_auto] bg-[#fe7a36] rounded-[75px]">
                <img
                  className="relative w-4 h-4"
                  alt="Graph"
                  src="https://c.animaapp.com/AahFQzfZ/img/graph.svg"
                />
                <div className="relative w-[84px] h-[13px]">
                  <div className="absolute h-4 -top-px left-0 [font-family:'Spartan',Helvetica] font-medium text-white text-sm tracking-[0] leading-[normal] whitespace-nowrap">
                    In Progress
                  </div>
                </div>
              </div>
              <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto] border-r-2 pr-5">
                {tasks.inProgress.map((task) => {
                  return (
                    <div key={task.id}>
                      {edit && editID == task.id ? (
                        <>
                          <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                            <div className="flex flex-col w-[316px] items-start gap-6 px-[27px] py-4 relative flex-[0_0_auto] bg-white rounded-2xl overflow-hidden border border-solid border-[#7f27ff] shadow-[0px_1px_1px_#c7c7c712,0px_2px_2px_#c7c7c70f,0px_5px_3px_#c7c7c70a,0px_9px_3px_#c7c7c703,0px_13px_4px_transparent]">
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => seteditTitle(e.target.value)}
                                className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none"
                                placeholder="New task title"
                              />
                              <textarea
                                rows={3}
                                type="text"
                                value={editDesc}
                                onChange={(e) => seteditDesc(e.target.value)}
                                className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none"
                                placeholder="New task description"
                              />
                              <select
                                value={editCategory}
                                onChange={(e) =>
                                  setEditCategory(e.target.value)
                                }
                                className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none mt-2"
                              >
                                <option value="todo">To Do</option>
                                <option value="inProgress">In Progress</option>
                                <option value="inReview">In Review</option>
                                <option value="completed">Completed</option>
                              </select>
                              <div className="w-full flex gap-2">
                                <button
                                  onClick={() => handleSaveTask("inProgress")}
                                  className="w-2/3 py-2 bg-[#7f27ff] text-white rounded-lg"
                                >
                                  Save Task
                                </button>
                                <button
                                  onClick={() => {
                                    setEdit(false);
                                    setEditID();
                                    setEditCategory("");
                                    setNewDesc("");
                                    seteditTitle("");
                                  }}
                                  className="w-1/3 py-2 bg-[#fe7a36] text-white rounded-lg"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          key={task.id}
                          className="flex flex-col w-[316px] items-start gap-6 px-[27px] py-6 relative flex-[0_0_auto] bg-white rounded-3xl overflow-hidden shadow-[0px_1px_1px_#c7c7c712,0px_2px_2px_#c7c7c70f,0px_5px_3px_#c7c7c70a,0px_9px_3px_#c7c7c703,0px_13px_4px_transparent]"
                        >
                          <div className="flex w-[262px] items-center justify-between px-px py-0 relative flex-[0_0_auto]">
                            <div className="relative w-11 h-[21px] mt-[-1.00px] [font-family:'Spartan',Helvetica] font-medium text-[#fe7a36] text-lg tracking-[0] leading-[normal] whitespace-nowrap">
                              {task.title}
                            </div>
                            <div className="flex gap-2">
                              <img
                                className="relative flex-[0_0_auto] cursor-pointer"
                                alt="Frame"
                                src={deleteIcon}
                                onClick={() =>
                                  handleDelete(task.id, "inProgress")
                                }
                              />
                              <img
                                className="relative flex-[0_0_auto] cursor-pointer"
                                alt="Frame"
                                src={editIcon}
                                onClick={() => handleEdit(task, "inProgress")}
                              />
                            </div>
                          </div>
                          <p className="relative w-[261px] [font-family:'Spartan',Helvetica] font-medium text-[#303030] text-base tracking-[0] leading-[normal]">
                            {task.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="inline-flex flex-col items-start gap-9 absolute top-0 left-[712px] w-[356px]">
              <div className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 relative flex-[0_0_auto] bg-[#1679AB] rounded-[75px]  border-r-2">
                <img
                  className="relative w-4 h-4"
                  alt="List"
                  src="https://c.animaapp.com/AahFQzfZ/img/list.svg"
                />
                <div className="relative w-[70px] h-[13px]">
                  <div className="absolute h-4 -top-px left-0 [font-family:'Spartan',Helvetica] font-medium text-white text-sm tracking-[0] leading-[normal] whitespace-nowrap">
                    In Review
                  </div>
                </div>
              </div>
              <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]  border-r-2 pr-5">
                {tasks.inReview.map((task) => {
                  return (
                    <div key={task.id}>
                      {edit && editID == task.id ? (
                        <>
                          <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                            <div className="flex flex-col w-[316px] items-start gap-6 px-[27px] py-4 relative flex-[0_0_auto] bg-white rounded-2xl overflow-hidden border border-solid border-[#7f27ff] shadow-[0px_1px_1px_#c7c7c712,0px_2px_2px_#c7c7c70f,0px_5px_3px_#c7c7c70a,0px_9px_3px_#c7c7c703,0px_13px_4px_transparent]">
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => seteditTitle(e.target.value)}
                                className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none"
                                placeholder="New task title"
                              />
                              <textarea
                                rows={3}
                                type="text"
                                value={editDesc}
                                onChange={(e) => seteditDesc(e.target.value)}
                                className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none"
                                placeholder="New task description"
                              />
                              <select
                                value={editCategory}
                                onChange={(e) =>
                                  setEditCategory(e.target.value)
                                }
                                className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none mt-2"
                              >
                                <option value="todo">To Do</option>
                                <option value="inProgress">In Progress</option>
                                <option value="inReview">In Review</option>
                                <option value="completed">Completed</option>
                              </select>
                              <div className="w-full flex gap-2">
                                <button
                                  onClick={() => handleSaveTask("inReview")}
                                  className="w-3/4 py-2 bg-[#7f27ff] text-white rounded-lg"
                                >
                                  Save Task
                                </button>
                                <button
                                  onClick={() => {
                                    setEdit(false);
                                    setEditID();
                                    setEditCategory("");
                                    setNewDesc("");
                                    seteditTitle("");
                                  }}
                                  className="w-1/3 py-2 bg-[#fe7a36] text-white rounded-lg"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          key={task.id}
                          className="flex flex-col w-[316px] items-start gap-6 px-[27px] py-6 relative flex-[0_0_auto] bg-white rounded-3xl overflow-hidden shadow-[0px_1px_1px_#c7c7c712,0px_2px_2px_#c7c7c70f,0px_5px_3px_#c7c7c70a,0px_9px_3px_#c7c7c703,0px_13px_4px_transparent]"
                        >
                          <div className="flex w-[262px] items-center justify-between px-px py-0 relative flex-[0_0_auto]">
                            <div className="relative w-11 h-[21px] mt-[-1.00px] [font-family:'Spartan',Helvetica] font-medium text-[#1679AB] text-lg tracking-[0] leading-[normal] whitespace-nowrap">
                              {task.title}
                            </div>
                            <div className="flex gap-2">
                              <img
                                className="relative flex-[0_0_auto] cursor-pointer"
                                alt="Frame"
                                src={deleteIcon}
                                onClick={() =>
                                  handleDelete(task.id, "inReview")
                                }
                              />
                              <img
                                className="relative flex-[0_0_auto] cursor-pointer"
                                alt="Frame"
                                src={editIcon}
                                onClick={() => handleEdit(task, "inReview")}
                              />
                            </div>
                          </div>
                          <p className="relative w-[261px] [font-family:'Spartan',Helvetica] font-medium text-[#303030] text-base tracking-[0] leading-[normal]">
                            {task.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="inline-flex flex-col items-start gap-9 absolute top-0 left-[1068px] w-[356px] ">
              <div className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 relative flex-[0_0_auto] bg-[#17ab4b] rounded-[75px]  border-r-2">
                <img
                  className="relative w-4 h-4"
                  alt="Check"
                  src={completedIcon}
                />
                <div className="relative w-[76px] h-[13px]">
                  <div className="absolute h-4 -top-px left-0 [font-family:'Spartan',Helvetica] font-medium text-white text-sm tracking-[0] leading-[normal] whitespace-nowrap">
                    Completed
                  </div>
                </div>
              </div>
              <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto] pr-5">
                {tasks.completed.map((task) => {
                  return (
                    <div>
                      {edit && editID == task.id ? (
                        <>
                          <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                            <div className="flex flex-col w-[316px] items-start gap-6 px-[27px] py-4 relative flex-[0_0_auto] bg-white rounded-2xl overflow-hidden border border-solid border-[#7f27ff] shadow-[0px_1px_1px_#c7c7c712,0px_2px_2px_#c7c7c70f,0px_5px_3px_#c7c7c70a,0px_9px_3px_#c7c7c703,0px_13px_4px_transparent]">
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => seteditTitle(e.target.value)}
                                className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none"
                                placeholder="New task title"
                              />
                              <textarea
                                rows={3}
                                type="text"
                                value={editDesc}
                                onChange={(e) => seteditDesc(e.target.value)}
                                className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none"
                                placeholder="New task description"
                              />
                              <select
                                value={editCategory}
                                onChange={(e) =>
                                  setEditCategory(e.target.value)
                                }
                                className="w-full border-b-2 border-b-[#7f27ff] border-0 outline-none mt-2"
                              >
                                <option value="todo">To Do</option>
                                <option value="inProgress">In Progress</option>
                                <option value="inReview">In Review</option>
                                <option value="completed">Completed</option>
                              </select>
                              <div className="w-full flex gap-2">
                                <button
                                  onClick={() => handleSaveTask("completed")}
                                  className="w-2/3 py-2 bg-[#7f27ff] text-white rounded-lg"
                                >
                                  Save Task
                                </button>
                                <button
                                  onClick={() => {
                                    setEdit(false);
                                    setEditID();
                                    setEditCategory("");
                                    setNewDesc("");
                                    seteditTitle("");
                                  }}
                                  className="w-1/3 py-2 bg-[#fe7a36] text-white rounded-lg"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          key={task.id}
                          className="flex flex-col w-[316px] items-start gap-6 px-[27px] py-6 relative flex-[0_0_auto] bg-white rounded-3xl overflow-hidden shadow-[0px_1px_1px_#c7c7c712,0px_2px_2px_#c7c7c70f,0px_5px_3px_#c7c7c70a,0px_9px_3px_#c7c7c703,0px_13px_4px_transparent]"
                        >
                          <div className="flex w-[262px] items-center justify-between px-px py-0 relative flex-[0_0_auto]">
                            <div className="relative w-11 h-[21px] mt-[-1.00px] [font-family:'Spartan',Helvetica] font-medium text-[#17ab4b] text-lg tracking-[0] leading-[normal] whitespace-nowrap">
                              {task.title}
                            </div>
                            <div className="flex gap-2">
                              <img
                                className="relative flex-[0_0_auto] cursor-pointer"
                                alt="Frame"
                                src={deleteIcon}
                                onClick={() =>
                                  handleDelete(task.id, "completed`")
                                }
                              />
                              <img
                                className="relative flex-[0_0_auto] cursor-pointer"
                                alt="Frame"
                                src={editIcon}
                                onClick={() => handleEdit(task, "completed`")}
                              />
                            </div>
                          </div>
                          <p className="relative w-[261px] [font-family:'Spartan',Helvetica] font-medium text-[#303030] text-base tracking-[0] leading-[normal]">
                            {task.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
