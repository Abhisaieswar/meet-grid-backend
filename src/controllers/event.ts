import DbConnectionManager from "../db/DbConnectionManager";

const dbManager = DbConnectionManager.getInstance();

export const createEvent = async (req: any, res: any) => {
  try {
    const entityManager = await dbManager.getManager();
    const eventPayload = req.body;

    await entityManager.save(Event, eventPayload);
    res.status(200).send("Event created successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err });
  }
};
