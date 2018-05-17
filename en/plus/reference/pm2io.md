---
layout: page
title: Reference | Keymetrics Documentation
menu: starter
lang: en
section: plus
redirect_from: "/plus/reference/pm2io"
---

# The @pm2/io Library

[@pm2/io](https://github.com/keymetrics/pm2-io-apm/tree/master/test) is the library that comes with PM2 which is in charge of gathering the metrics that are displayed in `pm2 monit` or in the web dashboard. By default, the module just wraps your app but can be required in the code to refine the configuration or add custom metrics/actions.

---

### Initialisation options

```javascript
io.init({
  metrics: {
    eventLoopActive: true, // (default: true) Monitor active handles and active requests
    eventLoopDelay: true,  // (default: true) Get event loop's average delay

    network : {       // Network monitoring at the application level
      traffic : true, // (default: true) Allow application level network monitoring
      ports   : true  // (default: false) Shows which ports your app is listening on
    },

    // Transaction Tracing system configuration
    transaction  : {
      http : true,              // (default: true) HTTP routes logging
      tracing: {                // (default: false) Enable transaction tracing
        http_latency: 1,        // (default: 200) minimum latency in milliseconds to take into account
        ignore_routes: ['/foo'] // (default: empty) exclude some routes
      }
    },
  
    deepMetrics: {
      mongo: true,     // (default: true) Mongo connections monitoring
      mysql: true,     // (default: true) MySQL connections monitoring
      mqtt: true,      // (default: true) Mqtt connections monitoring
      socketio: true,  // (default: true) WebSocket monitoring
      redis: true,     // (default: true) Redis monitoring
      http: true,      // (default: true) Http incoming requests monitoring
      https: true,     // (default: true) Https incoming requests monitoring
      "http-outbound": true, // (default: true) Http outbound requests monitoring
      "https-outbound": true // (default: true) Https outbound requests monitoring
    },
  
    v8: {
      new_space: true,                    // (default: true) New objects space size
      old_space: true,                    // (default: true) Old objects space size
      map_space: true,                    // (default: true) Map space size
      code_space: true,                   // (default: true) Executable space size
      large_object_space: true,           // (default: true) Large objects space size
      total_physical_size: false,         // (default: false) Physical heap size
      total_heap_size: true,              // (default: true)  Heap size
      total_available_size: false,        // (default: false) Total available size for the heap
      total_heap_size_executable: true,   // (default: true)  Executable heap size
      used_heap_size: true,               // (default: true)  Used heap size
      heap_size_limit: true,              // (default: true)  Heap size maximum size
      malloced_memory: false,             // (default: false) Allocated memory
      peak_malloced_memory: false,        // (default: false) Peak of allocated memory
      does_zap_garbage: false,            // (default: false) Zap garbage enable/disable
      GC: {
        totalHeapSize: true,              // (default: true)  GC heap size
        totalHeapExecutableSize: true,    // (default: true)  GC executable heap size
        usedHeapSize: true,               // (default: true)  GC used heap size
        heapSizeLimit: false,             // (default: false) GC heap size maximum size
        totalPhysicalSize: false,         // (default: false) GC heap physical size
        totalAvailableSize: false,        // (default: false) GC available size
        mallocedMemory: false,            // (default: false) GC allocated memory
        peakMallocedMemory: false,        // (default: false) GC peak of allocated memory
        gcType: true,                     // (default: true)  Type of GC (scavenge, mark/sweep/compact, ...)
       gcPause: true                     // (default: true)  Duration of pause (in milliseconds)
      }
    }
  },
  
  actions: {
    eventLoopDump: false, // (default: false) Enable event loop dump action
    profilingCpu: true,   // (default: true) Enable CPU profiling actions
    profilingHeap: true   // (default: true) Enable Heap profiling actions
  }
});
```