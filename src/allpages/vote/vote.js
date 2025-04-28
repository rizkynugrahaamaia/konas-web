import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useGetVoteList, useCreateCandidate } from '../../api/vote';
import { initialColors, initialBorderColors } from './utils'; // Import color constants
import Modal from '../../components/sweetalert';
import illustrations from '../../configs/illustration';
import CandidateModal from './vote-modal';
import VoteData from './vote-data';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Vote() {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  const { data: voteData, isFetching, isLoading, isError } = useGetVoteList({}, { enabled: true,  initialData: [] });
  const { mutate: addCandidate, isLoading: addLoading } = useCreateCandidate();

  // Transformasi data
  const labels = voteData?.data?.map((item) => item.fullname) || [];
  const chartData = voteData?.data?.map((item) => item.count) || [];
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Chart options with responsive font sizes
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: windowWidth < 640 ? 'bottom' : 'top',
        labels: {
          font: {
            size: windowWidth < 640 ? 10 : 12
          }
        }
      },
      title: {
        display: true,
        text: 'Voting Results',
        font: {
          size: windowWidth < 640 ? 16 : 20
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // Only show whole numbers
          font: {
            size: windowWidth < 640 ? 10 : 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: windowWidth < 640 ? 10 : 12
          }
        }
      }
    }
  };
  
  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Number of Votes',
        data: chartData,
        backgroundColor: initialColors,
        borderColor: initialBorderColors,
        borderWidth: 1,
      },
    ],
  };

  // Handle candidate submission
  const handleCandidateSubmit = (candidates) => {
    if (candidates.length === 0) return;
    const payload = candidates.map((candidate) => candidate.selected.value);

    addCandidate({ candidate: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['get-vote-list'] });
            Modal({
                allowOutsideClick: false,
                title: 'Berhasil!',
                text: 'Kandidat telah ditambahkan',
                icon: 'success',
                onConfirm: () => navigate('/vote')
            })
        },
        onError: () => {
            Modal({
                allowOutsideClick: false,
                title: 'Gagal!',
                text: 'Kandidat gagal ditambahkan.',
                icon: 'error',
                onConfirm: () => navigate('/vote')
            })
        }
      },
    );
    setIsModalOpen(false);
  };

  // Get short name for small screens
  const getShortName = (name) => {
    if (windowWidth < 350 && name.length > 10) {
      return name.substring(0, 8) + '...';
    }
    return name;
  };

  let view = null;

  if(isFetching || isLoading || addLoading) {
    return '...isLoading'
  }

  if(isError){
    return 'Error'
  }


  if(voteData?.data.length === 0) {
    view = (
      <div className="bg-white px-6 py-4 md:py-24 md:m-6 md:rounded-md 
        shadow-lg flex flex-col justify-center items-center max-h-screen">

        <img alt="scan" src={illustrations.vote}/>
        <p className="text-sm md:text-xl mt-3 md:mt-4">Silakan Menambah Kandidat</p>
        <p className="text-sm md:text-xl mt-1 md:mt-4 text-center">Anda perlu menambahkan kandidat untuk melakukan voting</p>
        
        {/* Centered button */}
        <div className="flex justify-center mt-4 sm:mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 sm:px-6 py-1 sm:py-2 bg-[#290849] text-white text-sm sm:text-base rounded-md hover:bg-[#290849] shadow-sm"
          >
            Tambah Kandidat
          </button>
        </div>
        
      </div>
    );
  }else {
    view = (
    <>
      <VoteData
          options={options}
          data={data}
          labels={labels}
          chartData={chartData}
          backgroundColor={initialColors}
          setIsModalOpen={setIsModalOpen}
          getShortName={getShortName}
      />
    </>
    );
  }

  return (
    <div className="p-2 sm:p-4 w-full">
      {view}
      <CandidateModal 
        addLoading={addLoading}
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCandidateSubmit}
      />
    </div>
  );
}