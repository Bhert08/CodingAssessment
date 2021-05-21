import { useContext, useState } from "react";
import { AppContext } from "../Context";

const UserList = () => {
  const {
    users,
    userLength,
    editMode,
    cancelEdit,
    updateUser,
    deleteUser,
  } = useContext(AppContext);

  // Storing users new data when they editing their info.
  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateUser(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (id, name, market, flow, location) => {
    setNewData({ id, name, market, flow, location });
    editMode(id);
  };

  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteUser(id);
    }
  };

  return !userLength ? (
    <p>{userLength === null ? "Loading..." : "Please insert some users."}</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Market</th>
          <th>Flow</th>
          <th>Location</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, name, market, flow, location, isEditing }) => {
          return isEditing === true ? (
            <tr key={id}>
              <td>
                <input
                  type="text"
                  defaultValue={name}
                  onChange={(e) => updateNewData(e, "name")}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={market}
                  onChange={(e) => updateNewData(e, "market")}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={flow}
                  onChange={(e) => updateNewData(e, "flow")}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={location}
                  onChange={(e) => updateNewData(e, "location")}
                />
              </td>
              <td>
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  Save
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelEdit(id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={id}>
              <td>{name}</td>
              <td>{market}</td>
              <td>{flow}</td>
              <td>{location}</td>
              <td>
                <button
                  className="btn default-btn"
                  onClick={() => enableEdit(id, name, market, flow, location)}
                >
                  Edit
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;