import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { baseUrl } from "../config";
import axios from 'axios';
import { logoutAction } from '../redux/authSlice'


function Home() {
  const {
    currentUser,
    logout,
    tasks,
    openTaskModal,
    editSelectedTask,
    deleteTask,
    isAddModalOpen,
    isDeleteModalOpen,
    isEditModalOpen,
    openEditmodal,
    openDeletemodal,
    closeAddModal,
    closeEditModal,
    closeDeleteModal,
    addTask,
    title,
    description,
    dueDate,
    tags,
    status,
    setDescription,
    setTags,
    setTitle,
    setDueDate,
    setStatus,
    setTaskId,
    loading,
    editLoading,
    createLoading,
    deleteLoading,
    taskId,
    editDueDate,
    editStatus,
    setEDueDate,
    setEStatus
  } = useTaskHook()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Task Manager</h1>
          <h2 className="text-2xl font-semibold mb-4">User: {currentUser.data.username}</h2>
        </div>
        <div className="flex mb-4">
          <button
            className="ml-2 py-1 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={openTaskModal}
          >
            Add
          </button>
        </div>
        <div className="flex mb-4">
          <button
            className="ml-2 py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>
        {loading && (<p>Loading...</p>)}
        <ul>
          {tasks && tasks.map((task) => (
            <li key={task.id} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <li className="bg-white p-4 rounded shadow-md">
                  <h2 className="text-xl font-semibold">{task.title}</h2>
                  <p className="text-gray-600">Description: {task.description}</p>
                  <p className="text-gray-600">Due Date: {task.due_date}</p>
                  <p className="text-gray-600">Status: {task.status}</p>
                  <p className="text-gray-600">Tags: {task.tags}</p>
                </li>
                <div>
                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => {
                      setTaskId(task.id)
                      setEDueDate(task.due_date)
                      setEStatus(task.status)
                      openEditmodal()
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 ml-2"
                    onClick={() => {
                      setTaskId(task.id)
                      openDeletemodal()
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* modals */}

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        contentLabel="Add Task Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="bg-white p-4 rounded-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
          <div className="mb-4">
            <label className="block font-semibold">Task Title</label>
            <input
              type="text"
              placeholder="Task Title"
              className="w-full px-2 py-1 border rounded-lg outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Task Description</label>
            <input
              type="text"
              placeholder="Task Description"
              className="w-full px-2 py-1 border rounded-lg outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Status</label>
            <input
              type="text"
              placeholder="Not Started, PENDING, COMPLETED "
              className="w-full px-2 py-1 border rounded-lg outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Add tag/Category</label>
            <input
              type="text"
              placeholder="Add tag/Category"
              className="w-full px-2 py-1 border rounded-lg outline-none"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Due Date" className="block font-semibold">Due Date</label>
            <input
              type="date"
              className="w-full px-2 py-1 border rounded-lg outline-none"
              value={dueDate}
              placeholder="mm/dd/yyy"
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="py-1 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={addTask}
            >
              {createLoading ? "Loading" : "Save"}
            </button>
            <button
              className="py-1 px-3 bg-gray-300 ml-2 rounded-lg hover:bg-gray-400"
              onClick={closeAddModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* editmodal */}

      {taskId !== null && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Task Modal"
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
            <div className="mb-4">
              <label className="block font-semibold">Status</label>
              <input
                type="text"
                placeholder="Not Started, PENDING, Done"
                className="w-full px-2 py-1 border rounded-lg outline-none"
                value={editStatus}
                onChange={(e) => setEStatus(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Due Date</label>
              <input
                type="text"
                placeholder="Due Date"
                className="w-full px-2 py-1 border rounded-lg outline-none"
                value={editDueDate}
                onChange={(e) => setEDueDate(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="py-1 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={editSelectedTask}
              >
                {editLoading ? "Loading...." : "Save"}
              </button>
              <button
                className="py-1 px-3 bg-gray-300 ml-2 rounded-lg hover:bg-gray-400"
                onClick={closeEditModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
      // overlayClassName="modal-overlay"
      >
        <div>
          <h2 className=" block font-semibold">Delete Confirmation</h2>
          <p className="mb-4 block font-semibold">Are you sure you want to delete this task?</p>

          <button
            onClick={deleteTask}
            className="bg-red-500 text-white p-2 rounded-md mr-4"
          >
            {deleteLoading ? "Loading" : "Delete"}
          </button>
          <button
            onClick={closeDeleteModal}
            className="bg-gray-400 text-gray-700 p-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Home

const useTaskHook = () => {
  const { currentUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [editLoading, setELoading] = useState(false)
  const [deleteLoading, setDLoading] = useState(false)
  const [createLoading, setCLoading] = useState(false)

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({});
  const [taskId, setTaskId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const logout = () => {
    dispatch(logoutAction())
  }


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [tags, setTags] = useState("")
  const [priority, setPriority] = useState("")
  const [status, setStatus] = useState("")

  //fields for editing
  const [editStatus, setEStatus] = useState("")
  const [editDueDate, setEDueDate] = useState("")

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${currentUser.access_token}`,
  };

  const getTask = () => {
    setLoading(true)
    axios.get(`${baseUrl}/api/tasks`, {
      headers: headers
    })
      .then(function (response) {
        if (response.data) {
          setTasks(response.data.data)
        }
        setLoading(false)
      })
      .catch(function (error) {
        setLoading(false)
        alert(error.message)
        if (error.response.msg == "Token has expired") {
          alert("Session has ended. Login to continue")
          logout()
        }
        alert(error.response.data.message || error.response.data.msg)
      });
  }

  useEffect(() => {
    getTask()
  }, [currentUser])

  const addTask = () => {
    setCLoading(true)
    axios.post(`${baseUrl}/api/add_task`, {
      title: title,
      description: description,
      due_date: dueDate,
      tags: tags,
      priority: priority,
      status: status,
    }, { headers })
      .then(response => {
        setCLoading(false)
        if (response.data) {
          setTasks([...tasks, response.data]);
        }
        setAddModalOpen(false);
        window.alert("Task created successfully");
        getTask()
      })
      .catch(error => {
        setCLoading(false)
        alert(error.message)
        if (error.response.msg == "Token has expired") {
          alert("Session has ended. Login to continue")
          logout()
        }
        alert(error.response.data.message || error.response.data.msg)
      });
  }

  const editSelectedTask = () => {
    setELoading(true)
    if (taskId !== null) {
      axios.put(`${baseUrl}/api/update_task/${taskId}`, {
        due_date: editDueDate,
        status: editStatus,
      }, { headers })
        .then(response => {
          if (response.data) {
            setTasks([...tasks, response.data]);
          }
          setELoading(false)
          setEditModalOpen(false);
          alert(response.data.message)
          getTask()
        })
        .catch(error => {
          setELoading(false)
          alert(error.message)
          if (error.response && error.response.msg == "Token has expired") {
            alert("Session has ended. Login to continue")
            logout()
          }
          if (error.response.data && error.response.data.message) {
            alert(error.response.data.message || error.response.data.msg)
          }
        });
    }
  };

  const deleteTask = () => {
    setDLoading(true)
    if (taskId !== null) {
      console.log("t", taskId)
      axios.delete(`${baseUrl}/api/delete_task/${taskId}`, { headers })
        .then(response => {
          setDLoading(false)
          setDeleteModalOpen(false);
          alert(response.data.message)
          getTask()
        })
        .catch(error => {
          setDLoading(false)
          alert(error.message)
          if (error.response.msg == "Token has expired") {
            alert("Session has ended. Login to continue")
            logout()
          }
          alert(error.response.data.message || error.response.data.msg)
        });
    }
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  function openEditmodal() {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  function openDeletemodal() {
    setDeleteModalOpen(true)
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
  };


  const openTaskModal = () => {
    openAddModal()
  };


  return {
    currentUser,
    setNewTask,
    setTasks,
    tasks,
    newTask,
    openTaskModal,
    editSelectedTask,
    deleteTask,
    isAddModalOpen,
    openAddModal,
    isDeleteModalOpen,
    isEditModalOpen,
    openEditmodal,
    openDeletemodal,
    closeAddModal,
    closeEditModal,
    closeDeleteModal,
    addTask,
    title,
    description,
    dueDate,
    tags,
    priority,
    status,
    setDescription,
    setDueDate,
    setTags,
    setTitle,
    setPriority,
    setStatus,
    loading,
    editLoading,
    createLoading,
    deleteLoading,
    taskId,
    setTaskId,
    editDueDate,
    editStatus,
    setEDueDate,
    setEStatus,
    logout
  }
}