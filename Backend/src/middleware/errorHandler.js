export function notFound(req, res, next) {
  res.status(404).json({ success: false, error: "Route not found" });
}

export function errorHandler(err, req, res, next) {
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({ success: false, error: "Invalid ID format" });
  }

  // Mongoose validation
  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, error: "Validation error", details });
  }

  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({ success: false, error: err.message || "Server error" });
}
