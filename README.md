# opencode-sidebar-demo

A demonstration plugin for [OpenCode](https://github.com/sst/opencode) showcasing the experimental Sidebar Panel API.

> **Note:** This plugin requires the Sidebar Panel API which is not yet merged into OpenCode. It currently only works with [this fork](https://github.com/z80dev/opencode/tree/feature/plugin-sidebar-panels) (see [PR #6389](https://github.com/sst/opencode/pull/6389)). As such, this code is primarily provided for **illustration purposes** to demonstrate how the API works and what's possible with sidebar plugins.

## What is this?

This plugin serves as a reference implementation for the OpenCode sidebar panel system. It demonstrates how plugins can register custom panels that appear in the OpenCode sidebar alongside built-in sections like MCPs, context usage, and todos.

## What does it do?

The plugin registers two sidebar panels:

1. **Hello World** - A simple static panel showing plugin status and version
2. **Plugin Metrics** - A dynamic panel that updates on each render, displaying:
   - A render counter (increments each time the sidebar polls)
   - Current timestamp
   - Sample warning/error indicators
   - A random number (to visualize dynamic updates)

## How it works

OpenCode's sidebar panel API allows plugins to define a `sidebar` hook that returns an array of panels. Each panel has:

- `id` - Unique identifier for the panel
- `title` - Display name shown in the sidebar
- `items` - Array of label/value pairs with optional status indicators

### Static vs Dynamic Panels

The API supports both static and dynamic content:

```typescript
// Static - panels defined once at load time
sidebar: [
  { id: "my-panel", title: "My Panel", items: [...] }
]

// Dynamic - function called on each poll (every 5 seconds)
sidebar: () => [
  { id: "my-panel", title: "My Panel", items: [...] }
]
```

This plugin uses a dynamic getter function to demonstrate real-time updates. The `counter` variable increments on each call, and the timestamp updates to show the polling mechanism in action.

### Status Indicators

Each item can include a `status` field that controls its visual appearance:

- `success` - Green indicator
- `warning` - Yellow indicator
- `error` - Red indicator
- `info` - Blue indicator

## Installation

1. Clone this repository:

```bash
git clone https://github.com/z80dev/opencode-sidebar-demo.git
```

2. Add the plugin to your `opencode.json` using the local file path:

```json
{
  "plugin": ["file:///path/to/opencode-sidebar-demo/src/index.ts"]
}
```

Replace `/path/to/` with the actual path where you cloned the repository.

## Purpose

This plugin exists to:

1. **Demonstrate the API** - Show developers how to use the sidebar panel system
2. **Test the implementation** - Validate that dynamic updates, status colors, and panel rendering work correctly
3. **Serve as a template** - Provide a starting point for plugins that need sidebar integration

## API Reference

```typescript
import type { PluginInput, Hooks, SidebarPanel, SidebarPanelItem } from "@opencode-ai/plugin"

interface SidebarPanelItem {
  label: string
  value?: string
  status?: "success" | "warning" | "error" | "info"
}

interface SidebarPanel {
  id: string
  title: string
  items: SidebarPanelItem[] | (() => SidebarPanelItem[])
}

// In your plugin's hooks:
sidebar?: SidebarPanel[] | (() => SidebarPanel[])
```

## Note

The Sidebar Panel API is currently experimental and may change in future OpenCode releases.

## License

MIT
