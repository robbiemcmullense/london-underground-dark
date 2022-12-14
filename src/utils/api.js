//const APP_ID = "daf0bf3c";
const APP_KEY = "399cb984cf0b4dd18310d476cf5e2396";
const authQuery = `&app_key=${APP_KEY}`;

async function fetchData(resource) {
  const response = await fetch(
    `https://api.tfl.gov.uk${resource}?${authQuery}`
  );
  return response.json();
}

export async function fetchStations() {
  const { stopPoints } = await fetchData("/StopPoint/Mode/tube");
  return stopPoints.filter(item => item.stopType === "NaptanMetroStation");
}

export async function fetchArrivalsByLine(lineId, naptanId) {
  return await fetchData(`/Line/${lineId}/Arrivals/${naptanId}`);
}
