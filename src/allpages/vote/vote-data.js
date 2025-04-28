import { Bar } from 'react-chartjs-2';
import { useQueryClient } from '@tanstack/react-query';
import Modal from '../../components/sweetalert';
import { useDeleteCandidate, useDeleteVote } from '../../api/vote';

const VoteData = ({
    options = {},
    data = {},
    labels = [],
    chartData = [],
    backgroundColor = [],
    getShortName = () => {},
    setIsModalOpen = () => {},
}) => { 

    const queryClient = useQueryClient();
    const { mutate: deleteCandidate } = useDeleteCandidate();
    const { mutate: deleteVote } = useDeleteVote();

    const modalDelete = {
        popup: (type, callback) => (
              Modal({
                  confirmButtonText: 'Reset',
                  icon: 'warning',
                  showCancelButton: true,
                  title: 'Reset',
                  text: `Apakah anda yakin ingin reset ${type} ?`,
                  onConfirm: () => modalDelete.api(callback)
              })
          ),
          api: (callback) => (
              callback(null,
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({ queryKey: ['get-vote-list'] });
                        Modal({
                            title: 'Berhasil!',
                            text: 'Data telah dihapus.',
                            icon: 'success',
                        })
                    },
                    onError: () => {
                        Modal({
                            title: 'Gagal!',
                            text: 'Data gagal dihapus.',
                            icon: 'error',
                        })
                    }
                  },
                )
          )
      }
    

    const isCount = chartData?.some(v => v !== 0);

    return(
        <>
            {/* Header section */}
            <div className="mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Vote Dashboard</h1>
                <p className="text-sm sm:text-base text-gray-600">View the current voting results</p>
            </div>
      
            {/* Chart container */}
            <div className="border rounded-lg p-2 sm:p-4 bg-white shadow-sm">
                <div className="h-48 sm:h-64 md:h-80">
                <Bar options={options} data={data} />
                </div>
            </div>
      
            {/* Centered button */}
      
                    <div className="flex justify-end mt-4 sm:mt-6 gap-4">
                    {
                isCount && (
                        <button
                            onClick={() => { modalDelete.popup('vote', deleteVote) }}
                            className="px-4 sm:px-6 py-1 sm:py-2 bg-[#290849] text-white text-sm sm:text-base rounded-md hover:bg-[#290849] shadow-sm"
                        >
                            Reset Vote
                        </button>
                                       )
                                    }

                        <button
                            onClick={() => { modalDelete.popup('kandidat', deleteCandidate) }}
                            className="px-4 sm:px-6 py-1 sm:py-2 bg-[#290849] text-white text-sm sm:text-base rounded-md hover:bg-[#290849] shadow-sm"
                        >
                            Reset Kandidat
                        </button>
                    </div>

      
            {/* Vote statistics and breakdown section */} 
            <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                <div className="border rounded-lg p-3 sm:p-4 bg-white shadow-sm">
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Vote Statistics</h2>
                <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                    <div className="flex justify-between">
                    <span>Total Votes:</span>
                    <span className="font-medium">{chartData.reduce((a, b) => a + b, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Leading Candidate:</span>
                    <span className="font-medium truncate max-w-24 sm:max-w-full">
                        {labels[chartData.indexOf(Math.max(...chartData))]}
                    </span>
                    </div>
                    <div className="flex justify-between">
                    <span>Vote Margin:</span>
                    <span className="font-medium">
                        {Math.max(...chartData) - 
                        chartData.filter(v => v !== Math.max(...chartData))
                            .reduce((a, b) => Math.max(a, b), 0) || 0}
                    </span>
                    </div>
                </div>
                </div>
                
                <div className="border rounded-lg p-3 sm:p-4 bg-white shadow-sm">
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Vote Breakdown</h2>
                <div className="space-y-1 text-sm sm:text-base">
                    {labels.map((label, index) => (
                    <div key={index} className="flex items-center">
                        <div 
                        className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" 
                        style={{ backgroundColor: backgroundColor[index] }}
                        ></div>
                        <div className="flex-1 flex justify-between">
                        <span className="truncate mr-1">{getShortName(label)}:</span>
                        <span className="font-medium whitespace-nowrap">{chartData[index]} votes</span>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </>
    )
}

export default VoteData;