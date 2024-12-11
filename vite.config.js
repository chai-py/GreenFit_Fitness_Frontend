import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
// export default defineConfig({
//   server: {
//     host: true,
//     port: 5173, // Optional: Match your local dev port
//     hmr: {
//       protocol: 'wss',
//       host: '${urls.url}/', // Replace with your Render domain
//     },
//   },
// });
