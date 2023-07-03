import React, { useState } from "react";
import "./MetersForm.css";

const MetersForm = ({ classForRows, item, btnName, update }) => {
  const [formData, setFormData] = useState({
    display_name: item ? item.display_name : "",
    api_name: item ? item.api_name : "",
    active: item ? item.active : true,
    used_for_billing: item ? item.used_for_billing : true,
    type: item ? item.type : "sum",
  });
  const [disable, setDisable] = useState(true);
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.id === "api_name") {
      value = value.split(" ").join("_").toUpperCase();
    } else if (e.target.id === "display_name") {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    const newData = { ...formData, [e.target.id]: value };
    setFormData(newData);
    setDisable(Object.values(newData).some((el) => el === ""));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (update) {
      setDisable(true);
      try {
        res = await fetch(
          `https://take-home-exercise-api.herokuapp.com/meters/${item.id}`,
          {
            method: "PUT",
            headers: {
              "API-KEY":
                "8222ce6a252e5647365a2e958d18b83d5b4a698b7a8fcd474431eef2f212d196",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (res.ok) {
        } else {
          throw new Error(res.statusText);
        }
        setFormData(formData);
      } catch (e) {
        console.log("failed to update records", e);
      }
    } else {
      try {
        res = await fetch(
          "https://take-home-exercise-api.herokuapp.com/meters",
          {
            method: "POST",
            headers: {
              "API-KEY":
                "8222ce6a252e5647365a2e958d18b83d5b4a698b7a8fcd474431eef2f212d196",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (res.ok) {
          window.location.reload();
        } else {
          throw new Error(res.statusText);
        }
      } catch (e) {
        console.log("failed to update resords", e);
      }
    }
  };
  return (
    <form className="metersForm" onSubmit={handleFormSubmit}>
      <div className={classForRows}>
        <div className="meterFormData">
          <label className="meterFormLabel" htmlFor="display_name">
            Display Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            className="meterFormItemDataInput"
            id="display_name"
            value={formData.display_name}
            disabled={item ? item.existing : false}
          />
        </div>
        <div className="meterFormData">
          <label className="meterFormLabel" htmlFor="api_name">
            Api Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            className="meterFormItemDataInput"
            id="api_name"
            value={formData.api_name}
            disabled={item ? item.existing : false}
          />
        </div>
        <div className="meterFormData">
          <label className="meterFormLabel" htmlFor="active">
            Active
          </label>
          <select
            onChange={handleChange}
            className="meterFormItemDataInput"
            id="active"
            value={formData.active}
            disabled={item ? item.existing : false}
          >
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>
        </div>
      </div>
      <div className={classForRows}>
        <div className="meterFormData">
          <label className="meterFormLabel" htmlFor="used_for_billing">
            Used For Billing
          </label>
          <select
            onChange={handleChange}
            className="meterFormItemDataInput"
            id="used_for_billing"
            value={formData.used_for_billing}
            disabled={item ? item.existing : false}
          >
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>
        </div>
        <div className="meterFormData">
          <label className="meterFormLabel" htmlFor="type">
            Type
          </label>
          <select
            onChange={handleChange}
            className="meterFormItemDataInput"
            id="type"
            value={formData.type}
            disabled={item ? item.existing : false}
          >
            <option value="sum">sum</option>
            <option value="max">max</option>
            <option value="unique_count">unique_count</option>
          </select>
        </div>
      </div>
      <button
        className={
          item && item.existing ? "meterFormBtn hidden" : "meterFormBtn"
        }
        type="submit"
        disabled={disable}
      >
        {btnName}
      </button>
    </form>
  );
};

export default MetersForm;
