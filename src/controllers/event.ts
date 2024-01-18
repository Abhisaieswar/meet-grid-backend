import DbConnectionManager from "../db/DbConnectionManager";
import { Event } from "../db/entities/Event";

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

export const getEventByEventId = async (req: any, res: any) => {
  try {
    const entityManager = await dbManager.getManager();
    const { eventId } = req.body;

    const eventData = await entityManager.find(Event, {
      where: {
        id: eventId,
      },
      relations: {
        users: true,
      },
    });
    res.status(200).send(eventData);
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

export const getEventByUserId = async (req: any, res: any) => {
  try {
    const entityManager = await dbManager.getManager();
    const { userId, startDate, endDate } = req.body;

    const eventData = await entityManager
      .createQueryBuilder(Event, "event")
      .innerJoin("event.users", "user")
      .where("user.id = :userId", { userId })
      .andWhere("event.startDate >= :startDate", { startDate })
      .andWhere("event.endDate <= :endDate", { endDate })
      .getMany();

    res.status(200).send(eventData);
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};
