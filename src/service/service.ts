import { Repository } from "../repository/repository";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

export class Service {
    private repository = new Repository();

    public findNearByDriver(pickupLocation: string) {
        this.allotDriverMap();
        return this.dijkstraAlgorithm(pickupLocation, Repository.graph);
    }

    public allotDriverMap() {
        const driver = this.repository.allocateDriverMap([
            { name: "Arjun", node: "A", speed: 2 },
            { name: "Brian", node: "B", speed: 3 },
            { name: "Chris", node: "C", speed: 2 },
            { name: "Dev", node: "D", speed: 3 },
            { name: "Ethan", node: "E", speed: 2 },
            { name: "Farhan", node: "F", speed: 3 },
            { name: "Gaurav", node: "G", speed: 2 },
            { name: "Harsh", node: "H", speed: 3 },
            { name: "Ishaan", node: "I", speed: 2 },
            { name: "Jay", node: "J", speed: 3 },
            { name: "Karan", node: "K", speed: 2 },
            { name: "Leo", node: "L", speed: 3 },
            { name: "Manav", node: "M", speed: 2 },
            { name: "Nikhil", node: "N", speed: 3 },
            { name: "Owen", node: "O", speed: 2 },
            { name: "Pranav", node: "P", speed: 3 },
            { name: "Qadir", node: "Q", speed: 2 },
            { name: "Rahul", node: "R", speed: 3 },
            { name: "Sameer", node: "S", speed: 2 },
            { name: "Tarun", node: "T", speed: 3 },
            { name: "Uday", node: "U", speed: 2 },
            { name: "Varun", node: "V", speed: 3 },
            { name: "William", node: "W", speed: 2 },
            { name: "Xavier", node: "X", speed: 3 },
            { name: "Yash", node: "Y", speed: 2 },
            { name: "Zaid", node: "Z", speed: 3 },
        ]);

        if (driver) {
            console.log("Seed Successfull");
        }
    }

    public allotDriver(start: string) {
        this.allotDriverMap();
        const map = this.dijkstraAlgorithm(start, Repository.graph);
        var time = Number.MAX_VALUE;
        var driverDestination = "";

        if (!map || !map.distances) {
            throw new Error("Unable to allocate driver");
        }

        for (const [key, value] of map.distances) {
            if (key != start && value < time) {
                time = value;
                driverDestination = key;
            }
        }

        return {
            time,
            driverDestination,
        };
    }

    private dijkstraAlgorithm(
        start: string,
        graph: Map<
            string,
            { node: string; weight: number; trafficMultiplier: number }[]
        >,
    ) {
        //Need a minimum distance or area for finding out the driver else it'll search entire area or graph
        //Filter find every driver that can arrive within 5 minutes and alot only the one that has smallest ETA
        const distances = new Map();
        const previous = new Map<string, string>();
        const pq = new MinPriorityQueue<string>();

        for (const node of graph.keys()) {
            if (node != start.toUpperCase()) {
                distances.set(node, Infinity);
            }
        }

        distances.set(start.toUpperCase(), 0);
        pq.enqueue(start.toUpperCase());

        while (!pq.isEmpty()) {
            const current = pq.dequeue();

            if (!current) {
                return;
            }

            for (const edge of graph.get(current)!) {
                if (!Repository.driverMap.get(edge.node)) {
                    continue;
                }

                const driver = Repository.driverMap.get(edge.node);

                const newDistance = Math.round(
                    (distances.get(current) + edge.weight) *
                    edge.trafficMultiplier *
                    driver?.speed!,
                );

                if (newDistance < distances.get(edge.node) && newDistance <= 15) {
                    distances.set(edge.node, newDistance);
                    pq.enqueue(edge.node);
                    previous.set(edge.node, current);
                }
            }
        }

        return {
            distances: distances,
            directions: previous,
        };
    }
}
