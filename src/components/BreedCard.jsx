import React from 'react';

const BreedCard = ({ breed }) => {
  // Destructuring breed attributes for cleaner code
  const {
    id,
    attributes: {
      name,
      description,
      life,
      male_weight,
      female_weight,
      hypoallergenic
    }
  } = breed;

  // Helper function to format weight range
  const formatWeightRange = (maleWeight, femaleWeight) => {
    const minWeight = Math.min(maleWeight.min, femaleWeight.min);
    const maxWeight = Math.max(maleWeight.max, femaleWeight.max);
    return `${minWeight} - ${maxWeight} kg`;
  };

  // Helper function to format lifespan
  const formatLifespan = (life) => {
    return `${life.min} - ${life.max} years`;
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-700">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white truncate">{name}</h3>
        <div className="flex items-center mt-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            hypoallergenic 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {hypoallergenic ? 'Hypoallergenic' : 'Not Hypoallergenic'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {description.length > 150 ? description.substring(0, 150) + '...' : description}
        </p>

        {/* Breed Details */}
        <div className="space-y-3">
          {/* Lifespan */}
          <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-300">Lifespan</span>
            </div>
            <span className="text-sm font-bold text-white">
              {formatLifespan(life)}
            </span>
          </div>

          {/* Weight Range */}
          <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-300">Weight Range</span>
            </div>
            <span className="text-sm font-bold text-white">
              {formatWeightRange(male_weight, female_weight)}
            </span>
          </div>

          {/* Gender-specific weights */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 rounded-lg p-2 text-center">
              <p className="text-xs text-blue-600 font-medium">Male</p>
              <p className="text-sm font-bold text-blue-800">
                {male_weight.min}-{male_weight.max} kg
              </p>
            </div>
            <div className="bg-pink-50 rounded-lg p-2 text-center">
              <p className="text-xs text-pink-600 font-medium">Female</p>
              <p className="text-sm font-bold text-pink-800">
                {female_weight.min}-{female_weight.max} kg
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-3 bg-gray-700 border-t border-gray-600">
        <p className="text-xs text-gray-400 truncate">
          Breed ID: {id.substring(0, 8)}...
        </p>
      </div>
    </div>
  );
};

export default BreedCard;
