import { memo } from 'react'
import { StepType } from '../types'

interface StepIndicatorProps {
  currentStep: StepType
}

const StepIndicator = memo(({ currentStep }: StepIndicatorProps) => {
  const stepLabels = ['Choose Basket', 'Add Items', 'Customize']
  
  return (
    <div className="mb-6 lg:mb-12">
      {/* Mobile: Vertical Layout */}
      <div className="lg:hidden px-4">
        <div className="relative">
          {['basket', 'items', 'customize'].map((stepName, index) => {
            const isCompleted = (currentStep === 'items' && stepName === 'basket') || 
                               (currentStep === 'customize' && (stepName === 'basket' || stepName === 'items'))
            const isCurrent = currentStep === stepName
            
            return (
              <div key={stepName} className="relative">
                <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-4 mb-4 relative">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all flex-shrink-0 relative z-10 ${
                      isCurrent 
                        ? 'bg-amber-800 text-white shadow-lg' 
                        : isCompleted 
                        ? 'bg-green-500 text-white shadow-md' 
                        : 'bg-stone-200 text-stone-500'
                    }`}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className={`text-base font-semibold mb-1 ${
                        isCurrent ? 'text-amber-800' : isCompleted ? 'text-green-600' : 'text-stone-400'
                      }`}>
                        {stepLabels[index]}
                      </div>
                      <div className={`text-sm ${
                        isCurrent ? 'text-amber-600' : isCompleted ? 'text-green-500' : 'text-stone-400'
                      }`}>
                        {isCurrent ? 'In Progress' : isCompleted ? 'Completed' : 'Pending'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Vertical connector line */}
                {index < 2 && (
                  <div className={`absolute left-9 top-14 w-0.5 h-6 z-0 ${
                    (currentStep === 'customize' && index === 0) || 
                    (currentStep === 'items' && index === 1) ||
                    (currentStep === 'customize' && index === 1)
                      ? 'bg-green-300' : 'bg-stone-300'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Desktop: Horizontal Layout */}
      <div className="hidden lg:flex items-center justify-center space-x-8 px-4">
        {['basket', 'items', 'customize'].map((stepName, index) => {
          const isCompleted = (currentStep === 'items' && stepName === 'basket') || 
                             (currentStep === 'customize' && (stepName === 'basket' || stepName === 'items'))
          const isCurrent = currentStep === stepName
          
          return (
            <div key={stepName} className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  isCurrent 
                    ? 'bg-amber-800 text-white' 
                    : isCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-stone-200 text-stone-500'
                }`}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span className={`text-base font-medium ${
                  isCurrent ? 'text-amber-800' : isCompleted ? 'text-green-600' : 'text-stone-400'
                }`}>
                  {stepLabels[index]}
                </span>
              </div>
              {index < 2 && (
                <div className={`w-12 h-px mx-4 ${
                  isCompleted ? 'bg-green-200' : 'bg-stone-200'
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
