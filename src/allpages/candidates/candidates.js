import React from 'react';
import { useGetVoteByUser, useGetCandidate} from '../../api/vote';
import illustrations from '../../configs/illustration';
import SelectCandidate from './select-candidate';


export default function Vote() {
  
  const { 
    data: voteData, 
    isFetching: isFetchingVote, 
    isLoading: isLoadingVote, 
    isError: isErrorVote, 
    error: errorVote, 
    refetch: refetchVote 
  } = useGetVoteByUser({}, { enabled: true,  initialData: [] });
  
  const { 
    data: candidateData, 
    isFetching: isFetchingCand, 
    isLoading: isLoadingCand, 
    isError: isErrorCand, 
    refetch: refetchCand 
  } = useGetCandidate({}, { enabled: true,  initialData: [] });

  let view = null;

  if(isFetchingVote || isLoadingVote || isFetchingCand || isLoadingCand) { return '...isLoading' }

  if( (isErrorVote && errorVote.code !== 404) || isErrorCand ){ return 'Error' }

  if(isErrorVote && errorVote.code === 404 && candidateData?.data?.length === 0){
    view = (
      <>
        <img alt="scan" src={illustrations.vote}/>
        <p className="text-sm md:text-xl mt-3 md:mt-4">Kandidat tidak tersedia</p>
        <p className="text-sm md:text-xl mt-1 md:mt-4 text-center">Anda belum dapat melakukan voting</p>
        
        <div className="flex justify-center mt-4 sm:mt-6">
          <button
            onClick={() => { refetchVote(); refetchCand() }}
            className="px-4 sm:px-6 py-1 sm:py-2 bg-[#290849] text-white text-sm sm:text-base rounded-md hover:bg-[#290849] shadow-sm"
          >
            Muat Ulang
          </button>
        </div>
      </>
    );
  }else{
    view = (
      <SelectCandidate
        candidates={candidateData?.data || []}
      />
    )
  }

  if(voteData?.data){
    view = (
      <>
      <img alt="scan" src={illustrations.success_scan}/>
      <p className="text-sm md:text-xl mt-3 md:mt-4">Berhasil Voting !</p>
      <p className="text-sm md:text-xl mt-1 md:mt-4 text-center">Terima kasih atas vote Anda.</p>
      
      <div className="flex justify-center mt-4 sm:mt-6">
        <button
          onClick={() => { refetchVote(); refetchCand() }}
          className="px-4 sm:px-6 py-1 sm:py-2 bg-[#290849] text-white text-sm sm:text-base rounded-md hover:bg-[#290849] shadow-sm"
        >
          Muat Ulang
        </button>
      </div>
    </>
    )
  }

  return (
    <div className="p-2 sm:p-4 w-full">
      <div className="bg-white px-6 py-4 md:py-24 md:m-6 md:rounded-md 
        shadow-lg flex flex-col justify-center items-center max-h-screen">
          {view}
      </div>
    </div>
  );
}