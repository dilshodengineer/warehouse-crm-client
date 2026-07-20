export const sidebarData = [
    {
      title: "Dashboard",
      path: "/",
      icon: "bi bi-speedometer2",
    },
  
    {
      title: "Savdo",
      icon: "bi bi  -cart",
      children: [
        {
          title: "Savdo qilish",
          path: "/sales/new",
          icon: "bi bi-plus-circle",
        },
        {
          title: "Savdolar tarixi",
          path: "/sales/history",
          icon: "bi bi-clock-history",
        },
        // {
        //   title: "Ro'yxat",
        //   path: "/sales/list",
        //   icon: "bi bi-list-check",
        // },
      ],
    },
  
    {
      title: "Omborxona",
      icon: "bi bi-box-seam",
      children: [
        {
          title: "Mahsulotlar",
          path: "/products",
          icon: "bi bi-box",
        },
        // {
        //   title: "Ombor partiyalari",
        //   path: "/stock-batches",
        //   icon: "bi bi-archive",
        // },
        // {
        //   title: "Qoldiq (balans)",
        //   path: "/stock-balance",
        //   icon: "bi bi-bar-chart",
        // },

        {
          title: "Mahsulot qo'shish",
          path: "/products/create",
          icon: "bi bi-plus-circle",
        }
      ],
    },
  
    {
      title: "Moliya",
      icon: "bi bi-cash-coin",
      children: [
        {
          title: "Pul oqimi",
          path: "/transactions",
          icon: "bi bi-cash-coin",
        },
        {
          title: "Tushum va chiqim",
          path: "/transactions/form",
          icon: "bi bi-arrow-down-up"
        }
      ],
    },
  
    {
      title: "Xodimlar",
      icon: "bi bi-people",
      children: [
        {
          title: "Xodimlar ro‘yxati",
          path: "/employees",
          icon: "bi bi-person-badge",
        },
        {
          title: "Rollar / huquqlar",
          path: "/roles",
          icon: "bi bi-shield-lock",
        },
      ],
    },
  
    {
      title: "Hisobotlar",
      icon: "bi bi-graph-up",
      children: [
        {
          title: "Savdo hisoboti",
          path: "/reports/sales",
          icon: "bi bi-graph-up-arrow",
        },
        {
          title: "Xarajatlar hisoboti",
          path: "/reports/expenses",
          icon: "bi bi-bar-chart-line",
        },
        {
          title: "Ombor hisoboti",
          path: "/reports/inventory",
          icon: "bi bi-boxes",
        },
      ],
    },
  ];