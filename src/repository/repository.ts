export class Repository {
    public static graph: Map<
        string,
        { node: string; weight: number; trafficMultiplier: number }[]
    >;
    public static driverMap: Map<string, { name: string; speed: number }>;
    public static pickup: string;
    public static destination: string;
    public static shortesRoute: Map<string, { node: string; weight: number }[]>;

    constructor() {
        Repository.driverMap = new Map<string, { name: string; speed: number }>();
        Repository.graph = new Map([
            [
                "A",
                [
                    { node: "B", weight: 4, trafficMultiplier: 1.2 },
                    { node: "C", weight: 2, trafficMultiplier: 1.5 },
                ],
            ],

            [
                "B",
                [
                    { node: "D", weight: 5, trafficMultiplier: 1.1 },
                    { node: "E", weight: 1, trafficMultiplier: 1.8 },
                ],
            ],

            [
                "C",
                [
                    { node: "D", weight: 8, trafficMultiplier: 1.3 },
                    { node: "F", weight: 3, trafficMultiplier: 1.1 },
                ],
            ],

            [
                "D",
                [
                    { node: "G", weight: 2, trafficMultiplier: 1.6 },
                    { node: "H", weight: 6, trafficMultiplier: 1.2 },
                ],
            ],

            [
                "E",
                [
                    { node: "H", weight: 4, trafficMultiplier: 1.4 },
                    { node: "I", weight: 7, trafficMultiplier: 1.1 },
                ],
            ],

            [
                "F",
                [
                    { node: "I", weight: 2, trafficMultiplier: 1.7 },
                    { node: "J", weight: 5, trafficMultiplier: 1.3 },
                ],
            ],

            [
                "G",
                [
                    { node: "K", weight: 3, trafficMultiplier: 1.2 },
                    { node: "L", weight: 4, trafficMultiplier: 1.5 },
                ],
            ],

            [
                "H",
                [
                    { node: "L", weight: 2, trafficMultiplier: 1.1 },
                    { node: "M", weight: 5, trafficMultiplier: 1.8 },
                ],
            ],

            [
                "I",
                [
                    { node: "M", weight: 3, trafficMultiplier: 1.4 },
                    { node: "N", weight: 6, trafficMultiplier: 1.2 },
                ],
            ],

            [
                "J",
                [
                    { node: "N", weight: 4, trafficMultiplier: 1.6 },
                    { node: "O", weight: 2, trafficMultiplier: 1.1 },
                ],
            ],

            [
                "K",
                [
                    { node: "P", weight: 5, trafficMultiplier: 1.3 },
                    { node: "Q", weight: 3, trafficMultiplier: 1.7 },
                ],
            ],

            [
                "L",
                [
                    { node: "Q", weight: 2, trafficMultiplier: 1.2 },
                    { node: "R", weight: 7, trafficMultiplier: 1.5 },
                ],
            ],

            [
                "M",
                [
                    { node: "R", weight: 4, trafficMultiplier: 1.1 },
                    { node: "S", weight: 3, trafficMultiplier: 1.8 },
                ],
            ],

            [
                "N",
                [
                    { node: "S", weight: 2, trafficMultiplier: 1.4 },
                    { node: "T", weight: 5, trafficMultiplier: 1.2 },
                ],
            ],

            [
                "O",
                [
                    { node: "T", weight: 3, trafficMultiplier: 1.6 },
                    { node: "U", weight: 6, trafficMultiplier: 1.1 },
                ],
            ],

            ["P", [{ node: "V", weight: 4, trafficMultiplier: 1.3 }]],

            [
                "Q",
                [
                    { node: "V", weight: 2, trafficMultiplier: 1.5 },
                    { node: "W", weight: 5, trafficMultiplier: 1.2 },
                ],
            ],

            [
                "R",
                [
                    { node: "W", weight: 3, trafficMultiplier: 1.7 },
                    { node: "X", weight: 6, trafficMultiplier: 1.1 },
                ],
            ],

            [
                "S",
                [
                    { node: "X", weight: 2, trafficMultiplier: 1.4 },
                    { node: "Y", weight: 4, trafficMultiplier: 1.8 },
                ],
            ],

            [
                "T",
                [
                    { node: "Y", weight: 3, trafficMultiplier: 1.2 },
                    { node: "Z", weight: 7, trafficMultiplier: 1.5 },
                ],
            ],

            ["U", [{ node: "Z", weight: 2, trafficMultiplier: 1.1 }]],

            ["V", [{ node: "X", weight: 3, trafficMultiplier: 1.6 }]],

            ["W", [{ node: "Y", weight: 2, trafficMultiplier: 1.3 }]],

            ["X", [{ node: "Z", weight: 4, trafficMultiplier: 1.2 }]],

            ["Y", [{ node: "Z", weight: 1, trafficMultiplier: 1.1 }]],

            [
                "Z",
                [
                    { node: "A", weight: 6, trafficMultiplier: 1.4 },
                    { node: "M", weight: 4, trafficMultiplier: 1.6 },
                ],
            ],
        ]);
    }

    public allocateDriverMap(
        drivers: Array<{
            name: string;
            node: string;
            speed: number;
        }>,
    ): Boolean {
        for (const idx of drivers) {
            Repository.driverMap.set(idx.node, { name: idx.name, speed: idx.speed });
        }

        return true;
    }

    public assignPickup(pickup: string) {
        Repository.pickup = pickup.toUpperCase();
    }

    public assignDestination(destination: string) {
        Repository.destination = destination.toUpperCase();
    }
}
