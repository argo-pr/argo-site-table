import {ReactNode} from "react";
import {getDrivers} from "@/app/server/order";
import {Driver} from "@prisma/client";

export default async function SlugOrdersLayout({children, params}: {
    children: ReactNode,
    params: { slug: string, drivers: Driver }

}) {
    const drivers = await getDrivers(params.slug!)
    if (drivers.drivers) {
        params.drivers = drivers.drivers[0]
    }

    return <>{children}</>
}