
setInterval(() => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
  if (startTime && !stopTime) {
    const now = new Date();
    const elapsedHours = (now - startTime) / 3600000;
    if (elapsedHours > 0.01) {
      new Notification("⏰ Timesheet Alert", {
        body: "Work time has exceeded 0.01 hours!",
      });
    }
  }
}, 300000);
