import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		},
		extensions: [".js", ".ts", ".tsx", ".jsx"]
	},
	server: {
		host: true,
		port: 5173,
		watch: {
			usePolling: true
		}
	}
});
