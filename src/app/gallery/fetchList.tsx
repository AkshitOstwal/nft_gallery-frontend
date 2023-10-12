
import { Column, Row } from '@/component';
import axios from 'axios';
import { ethers } from 'ethers';
import { default as NXTImage } from "next/image";
import { useEffect, useState } from 'react';
import { UserDataDto } from './models';


interface PaginatedDataProps {
  userAddress: string;
}

function PaginatedData(props: PaginatedDataProps) {
  const [data, setData] = useState<UserDataDto>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = async (page: number, fetchLatest: boolean = false) => {
    try {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
      }

      let reqOptions = {
        url: `http://localhost:3000/nft-list/getList?address=${props.userAddress}&page=${page}&fetchLatest=${fetchLatest}`,
        method: "GET",
        headers: headersList,
      }

      console.log(reqOptions.url)
      let response = await axios.request(reqOptions);


      setData(response.data);

      setTotalPages(Math.ceil(Number((response.data as UserDataDto).tokensCount) / 20))

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);


  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRefreshClick = () => {
    setCurrentPage(1)
    fetchData(currentPage, true); // Call the fetchData function when the button is clicked
  };


  return (
    <div>
      <h1>Paginated Data</h1>
      {data?.address}
      <div>currentPage:{currentPage}</div>
      <div>totalPages:{totalPages}</div>
      <button onClick={handleRefreshClick}>Refresh Data</button>
      <ul>
        {data?.tokens.map((token) => (
          <li key={token.id}>
            <div className="w-full h-full bg-card-bg border border-[#ffffff1a] rounded-card-radius">
              <div className='p-4'>
                <Column >
                  <Row>
                    <NXTImage className="flex" height={50} width={50} src={token.imageSmall ?? ""}
                      alt={`${token.name} Logo`} />
                    <strong className='flex pl-[10px]'>Token Name: {token.name || 'N/A'}</strong>
                    <div className='flex pl-[10px]'>ID: {token.tokenId}</div>
                    <div className='flex pl-[10px]'>Collection Name: {token.collectionName}</div>
                    <div className='flex pl-[10px]'>Floor Price (USD): {token.floorPriceUSD}</div>
                    <div className='flex pl-[10px]'>Floor Price (ETH): {ethers.formatEther('799000000000000')}</div>
                  </Row>

                  <Row>
                    <div className='flex pl-[10px]'>Total Cost Basis (USD): {token.totalCostBasisUSD}</div>
                    <div className='flex pl-[10px]'>Total Cost Basis (ETH): {ethers.formatEther(token.totalCostBasisWEI)}</div>
                    <div className='flex pl-[10px]'>Total Current Value (USD): {token.totalCurrentValueUSD}</div>
                    <div className='flex pl-[10px]'>Total Current Value (ETH): {ethers.formatEther(token.totalCurrentValueWEI)}</div>
                    <div className='flex pl-[10px]'>Unrealized Gains/Losses: {token.unrealizedGainsLosses}</div>
                  </Row>

                </Column>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className='p-10'>

        <Row center >
          <button onClick={previousPage} disabled={currentPage === 1}>
            Previous Page
          </button>

          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next Page
          </button>
        </Row>
      </div>


    </div>
  );
}

export default PaginatedData;

