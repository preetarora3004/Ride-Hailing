import { Request, Response } from "express";
import { Service } from "../service/service";

const service = new Service();

export class Controller {
    public async findNearByDriver(req: Request, res: Response) {
        const { pickup } = await req.body;

        if (!pickup) {
            throw Error("Invalid pickup point");
        }

        const map = service.findNearByDriver(pickup);

        if (!map) {
            throw new Error("No driver available");
        }

        const destination = JSON.stringify(Object.fromEntries(map.directions));
        const cost = JSON.stringify(Object.fromEntries(map.distances));

        return res.json({
            success: true,
            body: {
                destination,
                cost,
            },
        });
    }

    public async allocateDriverLocation(req: Request, res: Response) { }

    public async allocateDriver(req: Request, res: Response) {
        const { pickup } = await req.body;

        if (!pickup) {
            throw Error("Invalid pickup point");
        }

        const driver = service.allotDriver(pickup);

        if (!driver) {
            throw new Error("No driver available at this moment");
        }

        return res.json({
            success: true,
            data: {
                driver: driver.driverDestination,
                time: driver.time,
            },
        });
    }
}
