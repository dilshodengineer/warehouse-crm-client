import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function SidebarItem({ item }) {
  const location = useLocation();

  // 🔥 URL bo‘yicha active group
  const isActiveGroup = item.children?.some(
    (child) => child.path === location.pathname
  );

  // 🔥 STATE: parent click open/close
  const [open, setOpen] = useState(isActiveGroup);

  const handleToggle = () => {
    setOpen(!open);
  };

  // SIMPLE LINK
  if (item.path) {
    const active = location.pathname === item.path;

    return (
      <Link
        to={item.path}
        className={`link ${active ? "active" : ""}`}
      >
        {item.icon && (
          <i className={item.icon} style={{ marginRight: "8px" }}></i>
        )}

        {item.title}
      </Link>
    );
  }

  return (
    <div className="group">

      {/* PARENT CLICK */}
      <div
        className={`parent ${isActiveGroup ? "active" : ""}`}
        onClick={handleToggle}
      >
        <span className="parent-left">
          {item.icon && (
            <i className={item.icon} style={{ marginRight: "8px" }}></i>
          )}

          <span className="parent-title">{item.title}</span>
        </span>

        <span className="parent-icon">
          {open ? (
            <i className="bi bi-chevron-up"></i>
          ) : (
            <i className="bi bi-chevron-down"></i>
          )}
        </span>
      </div>

      {/* CHILDREN */}
      <div className={`children ${open ? "open" : ""}`}>
        {item.children.map((child, i) => {
          const active = location.pathname === child.path;

          return (
            <Link
              key={i}
              to={child.path}
              className={`child ${active ? "active" : ""}`}
            >
              {child.icon && (
                <i className={child.icon} style={{ marginRight: "8px" }}></i>
              )}

              {child.title}
            </Link>
          );
        })}
      </div>

    </div>
  );
}

export default SidebarItem;