"use client"
import PaginatedData from "./fetchList";


export default function GalleryPage() {

    return (
        <div className="flex">
            <h1 className=" text-white">
                Gallery
            </h1>
            <PaginatedData userAddress="0x77016474B3FFf23611cB827efBADaEa44f10637c" />
        </div>
    )

}
