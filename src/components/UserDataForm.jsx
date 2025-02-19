import React, { useState, useEffect } from "react";
// import { button } from "./ui/button";
// import { input } from "./ui/input";
// import { label } from "./ui/label";


export default function UserDataForm({ initialData, onUpdate }) {
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (initialData) {
      setUserData(initialData);
    }
  }, [initialData]);

  const handleinputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(userData));
    onUpdate(userData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={userData.name} onChange={handleinputChange} required />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input id="address" name="address" value={userData.address} onChange={handleinputChange} required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={userData.email} onChange={handleinputChange} required />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" value={userData.phone} onChange={handleinputChange} required />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
