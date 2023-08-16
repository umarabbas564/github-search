import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Define environment variables here
    "process.env.REACT_APP_API_BASE_URL": JSON.stringify(
      "https://api.github.com/search/"
    ),
  },
});
