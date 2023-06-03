import cors from "cors";
import express, { Express, Request, Response } from "express";
import { LampStatus, SensorStatus } from "../src/app/model";

const app: Express = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

let sequence = 0;
function getSequence() {
  return ++sequence + "";
}
// Stato delle lampadine
let store: LampStatus[] = [
  { id: getSequence(), status: "On", alias: "Lamp 1" },
  { id: getSequence(), status: "Off", alias: "Lamp 2" },
  { id: getSequence(), status: "On", alias: "Lamp 3" },
  { id: getSequence(), status: "Off", alias: "Lamp 4" }
];

// Stato dei sensori
let storeSensor: SensorStatus[] = [
  { id: getSequence(), status: "On", alias: "Sensor 1" },
  { id: getSequence(), status: "Off", alias: "Sensor 2" },
  { id: getSequence(), status: "On", alias: "Sensor 3" },
  { id: getSequence(), status: "Off", alias: "Sensor 4" }
];

// Endpoint per ottenere lo stato delle lampadine
app.get("/lamps", (req: Request, res: Response) => {
  setTimeout(() => {
    res.json(store);
  }, Math.random() * 100);
});
// Endpoint per ottenere lo stato dei sensori
app.get("/sensors", (req: Request, res: Response) => {
  setTimeout(() => {
    res.json(storeSensor);
  }, Math.random() * 100);
});

// Endpoint per impostare lo stato di una lampadina
app.put("/lamps/:lampId/switch/:newStatus", (req: Request<{ lampId: string, newStatus: "On" | "Off" | string }, any, any>, res: Response) => {
  const lampId = req.params.lampId;
  const newStatus = req.params.newStatus;
  if (newStatus !== "On" && newStatus !== "Off") {
    res.status(400)
      .json({ error: "Invalid status" });
    return;
  }
  const lamp = store.find(l => l.id === lampId);
  if (lamp) {
    lamp.status = newStatus;
    // delay di 1 secondo
    setTimeout(() => {
      res.json(lamp);
    }, Math.random() * 500);
  } else {
    res.status(404)
      .json({ error: "Lamp not found" });
  }
});

// Endpoint per impostare lo stato di un sensore
app.put("/sensors/:sensorId/switch/:newStatus", (req: Request<{ sensorId: string, newStatus: "On" | "Off" | string }, any, any>, res: Response) => {
  const sensorId = req.params.sensorId;
  const newStatus = req.params.newStatus;
  if (newStatus !== "On" && newStatus !== "Off") {
    res.status(400)
      .json({ error: "Invalid status" });
    return;
  }
  const sensor = storeSensor.find(s => s.id === sensorId);
  if (sensor) {
    sensor.status = newStatus;
    // delay di 1 secondo
    setTimeout(() => {
      res.json(storeSensor);
    }, Math.random() * 500);
  } else {
    res.status(404)
      .json({ error: "Sensor not found" });
  }
});

// Endpoint per aggiungere una lampadina
app.post("/lamps", (req: Request<any, any, { alias: string }>, res: Response) => {
  const alias = req.body.alias;

  if (!alias) {
    res.status(400)
      .json({ error: "Alias is required" });
    return;
  }

  const newLamp: LampStatus = {
    id: getSequence(),
    status: "Off",
    alias
  };
  store.push(newLamp);
  // delay di 1 secondo
  setTimeout(() => {
    res.json(newLamp);
  }, Math.random() * 100);

});

// Endpoint per aggiungere un sensore
app.post("/sensors", (req: Request<any, any, { alias: string }>, res: Response) => {
  const alias = req.body.alias;

  if (!alias) {
    res.status(400)
      .json({ error: "Alias is required" });
    return;
  }

  const newSensor: SensorStatus = {
    id: getSequence(),
    status: "Off",
    alias
  };
  storeSensor.push(newSensor);
  // delay di 1 secondo
  setTimeout(() => {
    res.json(newSensor);
  }, Math.random() * 100);

});

// Avvio del server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});