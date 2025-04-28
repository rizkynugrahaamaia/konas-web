import React, { useState } from 'react';
import Select from 'react-select';
import { useGetParticipantList } from '../../api/list-participant';

const CandidateModal = ({ isOpen, onClose, onSubmit, addLoading }) => {
  const [candidates, setCandidates] = useState([{ name: '', selected: null }]);
  const [errors, setErrors] = useState({});

  const { data: participantData, isLoading } = useGetParticipantList({
    page: 1,
    size: 10
  }, { enabled: true });

  const participantOptions = participantData?.map(participant => ({
    value: participant.userId,
    label: participant.fullname
  })) || [];

  const handleAddField = () => {
    if (candidates.length < 6) {
      setCandidates([...candidates, { name: '', selected: null }]);
    }
  };

  const handleRemoveField = (index) => {
    const newCandidates = [...candidates];
    newCandidates.splice(index, 1);
    setCandidates(newCandidates);
  };

  const handleChange = (index, selectedOption) => {
    const newCandidates = [...candidates];
    newCandidates[index] = {
      name: selectedOption?.label || '',
      selected: selectedOption
    };
    setCandidates(newCandidates);
    
    // Check for duplicates
    if (selectedOption) {
      const duplicates = newCandidates.filter(
        (c, i) => c.selected?.value === selectedOption.value && i !== index
      );
      
      if (duplicates.length > 0) {
        setErrors({
          ...errors,
          [index]: `${selectedOption.label} has already been selected`
        });
      } else {
        const newErrors = { ...errors };
        delete newErrors[index];
        setErrors(newErrors);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for duplicates before submitting
    const duplicates = candidates.reduce((acc, curr, idx) => {
      if (curr.selected) {
        const duplicateIndexes = candidates.reduce((indexes, c, i) => {
          if (c.selected?.value === curr.selected.value && i !== idx) {
            indexes.push(i);
          }
          return indexes;
        }, []);
        
        if (duplicateIndexes.length > 0) {
          duplicateIndexes.forEach(i => {
            acc[i] = `${curr.name} has already been selected`;
          });
        }
      }
      return acc;
    }, {});

    if (Object.keys(duplicates).length > 0) {
      setErrors(duplicates);
      return;
    }

    const validCandidates = candidates.filter(c => c.name.trim() !== '');
    
    onSubmit(validCandidates);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Candidates</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-3 mb-4">
            {candidates.map((candidate, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Select
                    className="flex-1"
                    options={participantOptions}
                    value={candidate.selected}
                    onChange={(selected) => handleChange(index, selected)}
                    isLoading={isLoading}
                    placeholder={`Type to search candidate ${index + 1}`}
                    isClearable
                    isSearchable
                    filterOption={(option, inputValue) => {
                      if (inputValue.length < 1) return false;
                      return option.label.toLowerCase().includes(inputValue.toLowerCase());
                    }}
                    noOptionsMessage={({ inputValue }) => 
                      inputValue.length < 1 
                        ? "Type to search candidates" 
                        : "No candidates found"
                    }
                  />
                  {candidates.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {errors[index] && (
                  <span className="text-red-500 text-sm">
                    {errors[index]}
                  </span>
                )}
              </div>
            ))}
          </div>
          
          {candidates.length < 6 && (
            <button
              type="button"
              onClick={handleAddField}
              className="text-blue-500 hover:text-blue-700 mb-4 flex items-center"
            >
              <span className="mr-1">+</span> Add another candidate
            </button>
          )}
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={!candidates.some(c => c.name.trim() !== '') || addLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateModal;