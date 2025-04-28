import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateVote } from "../../api/vote";
import Modal from '../../components/sweetalert';

const SelectCandidate = ({
    candidates = []
}) => { 

    const navigate = useNavigate();
      const queryClient = useQueryClient();
    const { mutate: addVote } = useCreateVote();
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const modalSubmit = {
        popup: () => (
              Modal({
                  confirmButtonText: 'Vote',
                  icon: 'warning',
                  showCancelButton: true,
                  title: 'Vote',
                  text: `Apakah anda yakin ingin memilih ${selectedCandidate.fullname}?`,
                  onConfirm: () => modalSubmit.api()
              })
          ),
          api: () => (
            addVote(selectedCandidate.userId,
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['get-vote-by-user'] });
                        queryClient.invalidateQueries({ queryKey: ['get-candidates-list'] });
                        Modal({
                            allowOutsideClick: false,
                            title: 'Berhasil!',
                            text: 'Anda berhasil melakukan voting',
                            icon: 'success',
                            onConfirm: () => navigate('/candidates')
                        })
                    },
                    onError: () => {
                        Modal({
                            allowOutsideClick: false,
                            title: 'Gagal!',
                            text: 'Anda gagal melakukan voting.',
                            icon: 'error',
                            onConfirm: () => navigate('/candidates')
                        })
                    }
                }
            )
          )
      }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        modalSubmit.popup();
    };

    return(
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Pilih Kandidat</h2>
        
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                {candidates.map((candidate) => (
                    <label 
                        key={candidate.userId} 
                        className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                        <input
                            type="radio"
                            name="candidate"
                            value={candidate.userId}
                            checked={selectedCandidate?.userId === candidate.userId}
                            onChange={(e) => setSelectedCandidate(candidate)}
                            className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-3">{candidate.fullname}</span>
                    </label>
                ))}
            </div>

            <div className="mt-6">
                <button
                    type="submit"
                    disabled={!selectedCandidate}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                             disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Submit Vote
                </button>
            </div>
        </form>
        </div>
    )
}

export default SelectCandidate;