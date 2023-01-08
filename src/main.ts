import app from './app';

async function start() {
  const port = process.env.PORT ?? 8888;

  app.listen(port, () => {
    console.log(`🌍 Server is running on port ${port}.`);
  });
}

start();
