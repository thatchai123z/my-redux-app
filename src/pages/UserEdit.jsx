import { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom"
import { fetchUser, editUser, createUser } from "../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";

function UserEdit() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const currentUser = useSelector((state) => state.user.currentUser);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id))
    }
  }, [id, useDispatch])

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser)
    }
  }, [currentUser])


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSave = async () => {
    if (id) {
      const response = await dispatch(editUser(userData))
      if (response.success) {
        alert("User updated successfully")
      }
    } else {
      const response = await dispatch(createUser(userData))
      if (response.success) {
        alert("User created successfully")
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="Name"
        className="mb-2 w-full rounded border p-2"
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
        className="mb-2 w-full rounded border p-2"
      />
      <input
        type="text"
        name="phoneNumber"
        value={userData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className="mb-4 w-full rounded border p-2"
      />

      <button onClick={handleSave} className="rounded bg-green-500 px-4 py-2 text-white">
        Save
      </button>
    </div>
  )
}

export default UserEdit