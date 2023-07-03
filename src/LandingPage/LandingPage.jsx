import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import MetersForm from "../MetersForm/MetersForm";

const LandingPage = () => {
  let [meters, setMeters] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: null, order: "asc" });
  const navigateTo = useNavigate();

  // Function to handle row click and set the selected item
  const handleRowClick = (item) => {
    navigateTo(`/details/${item.api_name}`, { state: { item } });
  };

  // Function to handle sort on each field
  const handleSort = (field) => {
    let order = "asc";
    if (sortOrder.field === field && sortOrder.order === "asc") {
      order = "desc";
    }
    setSortOrder({ field, order });

    const sortedData = [...meters].sort((a, b) => {
      if (a[field] < b[field]) {
        return order === "asc" ? -1 : 1;
      } else if (a[field] > b[field]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

    setMeters(sortedData);
  };
  // Function to return sort icon on click
  const getSortIcon = (field) => {
    if (sortOrder.field === field) {
      return sortOrder.order === "asc" ? (
        <span>&#9650;</span>
      ) : (
        <span>&#9660;</span>
      );
    }
    return null;
  };
  // Initial Request to fetch meters
  useEffect(() => {
    requestMetersList();
  }, []);

  async function requestMetersList() {
    try {
      setMeters([]);
      const res = await fetch(
        "https://take-home-exercise-api.herokuapp.com/meters",
        {
          method: "GET",
          headers: {
            "API-KEY":
              "8222ce6a252e5647365a2e958d18b83d5b4a698b7a8fcd474431eef2f212d196",
          },
        }
      );
      if (res.ok) {
        const json = await res.json();

        json.map((el) => {
          if (
            new Date(el.created_time).getTime() < new Date("7-2-2023").getTime()
          ) {
            el["existing"] = true;
          } else {
            el["existing"] = false;
          }
        });
        setMeters(json);
      }
    } catch (e) {
      console.log("failed request", e);
    }
  }
  return (
    <div className="metersContainer">
      <MetersForm
        classForRows="meterFormRowHorizontal"
        btnName="Add Meter"
        update={false}
      />
      <table className="meterTable">
        <tbody>
          <tr className="meterItem">
            <th
              className="meterItemHeader"
              onClick={() => handleSort("display_name")}
            >
              Display Name{" "}
              <span className="ascDescIcon">{getSortIcon("display_name")}</span>
            </th>
            <th
              className="meterItemHeader"
              onClick={() => handleSort("api_name")}
            >
              Api Name{" "}
              <span className="ascDescIcon">{getSortIcon("api_name")}</span>
            </th>
            <th
              className="meterItemHeader"
              onClick={() => handleSort("active")}
            >
              Active{" "}
              <span className="ascDescIcon">{getSortIcon("active")}</span>
            </th>
            <th
              className="meterItemHeader"
              onClick={() => handleSort("used_for_billing")}
            >
              Used For Billing{" "}
              <span className="ascDescIcon">
                {getSortIcon("used_for_billing")}
              </span>
            </th>
            <th className="meterItemHeader" onClick={() => handleSort("type")}>
              Type <span className="ascDescIcon">{getSortIcon("type")}</span>
            </th>
          </tr>
          {meters.map((meter) => (
            <tr
              className="meterItem"
              key={meter.id}
              onClick={() => handleRowClick(meter)}
            >
              <td className="meterItemData">{meter.display_name}</td>
              <td className="meterItemData">{meter.api_name}</td>
              <td className="meterItemData">{meter.active.toString()}</td>
              <td className="meterItemData">
                {meter.used_for_billing.toString()}
              </td>
              <td className="meterItemData">{meter.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LandingPage;
