export default async function handler(req, res) {
  const { query } = req;
  const ip = query.ip || ""; // optional: let users search by IP

  const apiKey = process.env.IPIFY_API_KEY;
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: err.message });
  }
}
