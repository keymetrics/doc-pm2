const metrics = {
  {
    id: 1,
    displayName: "CPU Usage",
    unit: "%",
    range: "0 - 100"
    shortDesc: "The CPU usage is the amount of time the CPU is busy. A CPU only can handle one operation at a time and so is either busy or idle.",
    longDesc: "",
    externalDoc: ""
  },
  {
    id: 2,
    displayName: "Memory Usage",
    unit: "Megabytes (MB)",
    range: "0 - total memory of the server",
    shortDesc: "The memory usage is the total amount of memory used by the application.",
    longDesc: "",
    externalDoc: ""
  },
  {
    id: 3,
    displayName: "Issues",
    shortDesc: "The number of new issues recorded in the app.",
    longDesc: "",
    externalDoc: ""
  },
  {
    id: 4,
    displayName: "Number of restart",
    shortDesc: "The number of restart of your application since added to the PM2 process list.",
    longDesc: "The number of restart of your application since added to the PM2 process list. PM2 automatically restarts your application whenever needed, for example after an uncaught exception has happened.",
    externalDoc: ""
  },
  {
    id: 5,
    displayName: "Number of processes",
    shortDesc: "The number of cluster on which your app has been spread on the server.",
    longDesc: "The number of cluster on which your app has been spread on the server. Only PM2 clusters appear.",
    externalDoc: ""
  },
  {
    id: 6,
    displayName: "HTTP requests per minute",
    unit: "Requests / minute (rpm)",
    shortDesc: "The number of requests the app is receiving per minute.",
    longDesc: "",
    externalDoc: ""
  },
  {
    id: 7,
    displayName: "Loop delay",
    unit: "Milliseconds (ms)",
    shortDesc: "How long it takes for Node.js to complete a full event loop.",
    longDesc: "",
    externalDoc: ""
  },
  {
    id: 8,
    displayName: "Active handles",
    shortDesc: "Handles represent long-lived objects capable of performing certain operations while active (a listening server for example).",
    longDesc: "Handles represent long-lived objects capable of performing certain operations while active. Some examples: - A prepare handle gets its callback called once every loop iteration when active. - A TCP server handle that gets its connection callback called every time there is a new connection.",
    externalDoc: ""
  },
  {
    id: 9,
    displayName: "Active requests",
    shortDesc: "Requests represent short-lived operations (write requests used to write data on a handle for example).",
    longDesc: "Requests represent short-lived operations. These operations can be performed over a handle: write requests are used to write data on a handle; or standalone: getaddrinfo requests don’t need a handle they run directly on the loop.",
    externalDoc: ""
  },
}