
import { Column, Row } from '@/component';
import { Token } from '@/models/models';
import axios from 'axios';
import { ethers } from 'ethers';
import { default as NXTImage } from "next/image";
import { useState } from 'react';


const BUTTON_CLASS = `text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`;

interface TokenLayoutProps {
    id: string;
}

function TokenLayout(props: TokenLayoutProps) {
    const [data, setData] = useState<Token>();


    const fetchData = async (id: string, fetchLatest: boolean = false) => {
        try {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            }

            let reqOptions = {
                url: `http://localhost:3000/nft-details/token?id=${props.id}&fetchLatest=${fetchLatest}`,
                method: "GET",
                headers: headersList,
            }

            console.log(reqOptions.url)
            let response = await axios.request(reqOptions);


            setData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData(props.id);


    const handleRefreshClick = () => {
        fetchData(props.id, true); // Call the fetchData function when the button is clicked
    };

    if (!data) {
        return (<div>
            Data is empty!!!
        </div>)
    }

    return (
        <div>
            <h1>Token Details</h1>
            {data?.collectionName}

            <button className={`${BUTTON_CLASS}`} onClick={handleRefreshClick}>Refresh Data</button>

            <div className="w-full h-full bg-card-bg border border-[#ffffff1a] rounded-card-radius">
                <div className='p-4'>
                    <Column >
                        <Row>
                            <NXTImage className="flex" height={100} width={100} src={data.image ?? ""}
                                alt={`${data.name} Logo`} />
                            <strong className='flex pl-[10px]'>Token Name: {data.name || 'N/A'}</strong>
                            <div className='flex pl-[10px]'>ID: {data.tokenId}</div>
                            <div className='flex pl-[10px]'>Collection Name: {data.collectionName}</div>

                        </Row>

                    </Column>
                    <section>
                        <div className='flex pl-[10px]'>Floor Price (USD): {data.floorPriceUSD}</div>
                        <div className='flex pl-[10px]'>Floor Price (ETH): {ethers.formatEther('799000000000000')}</div>
                        <div className='flex pl-[10px]'>Total Cost Basis (USD): {data.totalCostBasisUSD}</div>
                        <div className='flex pl-[10px]'>Total Cost Basis (ETH): {ethers.formatEther(data.totalCostBasisWEI)}</div>
                        <div className='flex pl-[10px]'>Total Current Value (USD): {data.totalCurrentValueUSD}</div>
                        <div className='flex pl-[10px]'>Total Current Value (ETH): {ethers.formatEther(data.totalCurrentValueWEI)}</div>
                        <div className='flex pl-[10px]'>Unrealized Gains/Losses: {data.unrealizedGainsLosses}</div>
                        <div className='flex pl-[10px]'>Rarity rank: {data.rarityRank}</div>
                        <div className='flex pl-[10px]'>Date of Acquisation: {data.dateOfAcquisition.toString()}</div>
                        <div className='flex pl-[10px]'>Item count: {data.itemCount}</div>

                    </section>

                </div>
            </div>

            <div className='p-10'>


            </div>


        </div>
    );
}

export default TokenLayout;

