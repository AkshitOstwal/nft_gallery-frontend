"use client"
import PaginatedData from "./fetchList";


export default function GalleryPage({ params }: { params: { address: string } }) {

    return (
        <div className="flex">
            <h1 className=" text-white">
                Gallery
            </h1>
            <PaginatedData userAddress={params.address} />
        </div>
    )

}
