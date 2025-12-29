import type { PluginInput, Hooks, SidebarPanel } from "@opencode-ai/plugin";

let counter = 0;

export default async function sidebarDemoPlugin(
  _input: PluginInput,
): Promise<Hooks> {
  return {
    sidebar: () => {
      counter++;

      const panels: SidebarPanel[] = [
        {
          id: "demo-status",
          title: "Hello World",
          items: [
            { label: "Status", value: "Active", status: "success" },
            { label: "Version", value: "1.0.0", status: "info" },
          ],
        },
        {
          id: "demo-metrics",
          title: "Plugin Metrics",
          items: [
            { label: "Render Count", value: String(counter), status: "info" },
            { label: "Timestamp", value: new Date().toLocaleTimeString() },
            { label: "Warnings", value: "2", status: "warning" },
            { label: "Errors", value: "0", status: "error" },
            { label: "Random", value: String(Math.floor(Math.random() * 100)) },
          ],
        },
      ];

      return panels;
    },
  };
}
