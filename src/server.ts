import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT) || 8000;

async function startServer() {
  try {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    server.on("error", (error) => {
      console.error("❌ Server error:", error);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
}

startServer().catch((error) => {
  console.error("❌ startup error:", error);
});