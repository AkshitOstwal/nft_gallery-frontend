"use client"

import TokenLayout from "./token"



export default function NftDetails({ params }: { params: { id: string } }) {

    return (
        <div className="flex">
            <h1 className=" text-white">
                Gallery
            </h1>
            <TokenLayout id={params.id} />
        </div>
    )

}
