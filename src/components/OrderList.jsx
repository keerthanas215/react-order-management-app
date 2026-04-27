import React, { useEffect, useMemo, useState } from "react";
import "./OrderList.css";

const initialOrders = [
  { id: 1, customer: "Christopher Greb", date: "2026-03-20", status: "open" },
  { id: 2, customer: "Justin beber", date: "2026-03-21", status: "closed" },
  { id: 3, customer: "Markus Schmidt", date: "2026-03-22", status: "open" },
];

const fetchedOrders = [
  { id: 4, customer: "Jeffrey Manalo", date: "2026-03-23", status: "closed" },
  { id: 5, customer: "David Joe", date: "2026-03-24", status: "open" },
  { id: 6, customer: "Miriam Brown", date: "2026-03-25", status: "closed" },
];

function OrderList() {
  const [orders, setOrders] = useState(initialOrders);
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders((prev) => [...prev, ...fetchedOrders]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customer.trim() || !date) return;

    const newOrder = {
      id: Date.now(),
      customer: customer.trim(),
      date,
      status: "open",
    };

    setOrders((prev) => [...prev, newOrder]);
    setCustomer("");
    setDate("");
  };

  const filteredOrders = useMemo(() => {
    return statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  return (
    <div className="order-container">
  <h2 className="order-title">Customer Orders</h2>

  <div className="order-grid">
    <div className="order-card">
      <div className="order-filter">
        <label className="order-label">Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="order-select"
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <ul className="order-list">
        {filteredOrders.map((order) => (
          <li key={order.id} className="order-item">
            <div>
              <strong>{order.customer}</strong>
              <div className="order-subtext">{order.date}</div>
            </div>

            <span className={`order-status ${order.status}`}>
              {order.status}
            </span>
          </li>
        ))}
      </ul>
    </div>

    <div className="order-card">
      <h3>Add New Order</h3>

      <form onSubmit={handleSubmit} className="order-form">
        <input
          type="text"
          placeholder="Customer name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="order-input"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="order-input"
        />

        <button type="submit" className="order-button">
          Add Order
        </button>
      </form>
    </div>
  </div>
</div>
  );
}

export default OrderList;