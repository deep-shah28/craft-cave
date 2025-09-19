import { memo } from 'react'
import { StepType } from '../types'

interface StepIndicatorProps {
  currentStep: StepType
}

const StepIndicator = memo(({ currentStep }: StepIndicatorProps) => {
  const stepLabels = ['Choose Basket', 'Add Items', 'Customize']
  
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center space-x-8">
        {['basket', 'items', 'customize'].map((stepName, index) => {
          const isCompleted = (currentStep === 'items' && stepName === 'basket') || 
                             (currentStep === 'customize' && (stepName === 'basket' || stepName === 'items'))
          const isCurrent = currentStep === stepName
          
          return (
            <div key={stepName} className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  isCurrent 
                    ? 'bg-amber-800 text-white' 
                    : isCompleted 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-stone-100 text-stone-400'
                }`}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span className={`text-sm font-medium ${
                  isCurrent ? 'text-amber-800' : isCompleted ? 'text-amber-800' : 'text-stone-400'
                }`}>
                  {stepLabels[index]}
                </span>
              </div>
              {index < 2 && (
                <div className={`w-12 h-px mx-4 ${
                  isCompleted ? 'bg-amber-200' : 'bg-stone-200'
                }`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
})

StepIndicator.displayName = 'StepIndicator'

export default StepIndicator
