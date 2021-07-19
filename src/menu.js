export const menu = [
    { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" },
    {
        label: "Companies",
        icon: "pi pi-fw pi-sitemap",
        items: [
            { label: "Company", icon: "pi pi-fw pi-ticket", to: "/company" },
           
        ],
      
    },
    {
        label: "Tickets",
        icon: "pi pi-fw pi-mobile",
        items: [
            { label: "Ticket", icon: "pi pi-fw pi-ticket", to: "/ticket" },
           
        ],
   
    },
   
    {
        label: "Documentation",
        icon: "pi pi-fw pi-question",
        command: () => {
            window.location = "#/documentation";
        },
    },
];
