interface PageBackgroundProps {
  variant?: 'default' | 'shop' | 'portfolio' | 'blog' | 'team'
}

export function PageBackground({ variant = 'default' }: PageBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-30 pointer-events-none">
      {variant === 'default' && (
        <>
          {/* Top gradient blob */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 transform-gpu blur-[100px]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4ade80] to-[#22c55e] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
            />
          </div>



          {/* Middle Left blob 2 (Under Funnel / Services) */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-[60%] transform-gpu blur-[120px]"
          >
            <div
              style={{
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
              }}
              className="relative aspect-[1/1] w-[50rem] bg-gradient-to-tr from-[#4ade80] via-[#22c55e] to-[#10b981] opacity-25"
            />
          </div>

          {/* Bottom gradient blob */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 transform-gpu blur-[100px]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-15rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 rotate-[-15deg] bg-gradient-to-tr from-[#22c55e] to-[#4ade80] opacity-35 sm:left-[calc(50%-20rem)] sm:w-[60rem]"
            />
          </div>
        </>
      )}

      {variant === 'shop' && (
        <div
          aria-hidden="true"
          className="absolute right-0 top-1/4 transform-gpu blur-[100px] rotate-12"
        >
          <div
            style={{
              clipPath:
                'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            }}
            className="aspect-[1/1] w-[60rem] bg-gradient-to-bl from-[#4ade80] via-[#22c55e] to-[#16a34a] opacity-30"
          />
        </div>
      )}

      {variant === 'portfolio' && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 transform-gpu blur-[100px]"
        >
          <div
            style={{
              clipPath:
                'polygon(50% 0%, 80.9% 22.5%, 100% 50%, 80.9% 77.5%, 50% 100%, 19.1% 77.5%, 0% 50%, 19.1% 22.5%)',
            }}
            className="mx-auto aspect-[1200/600] w-[75rem] bg-gradient-to-t from-[#4ade80] to-[#22c55e] opacity-30"
          />
        </div>
      )}

      {variant === 'blog' && (
        <div
          aria-hidden="true"
          className="absolute left-0 top-40 transform-gpu blur-[100px]"
        >
          <div
            style={{
              clipPath:
                'polygon(25.3% 15.8%, 0% 45.2%, 15.7% 82.4%, 52.6% 100%, 84.3% 91.6%, 97.2% 62.5%, 85.4% 28.9%, 61.8% 8.3%, 42.1% 0%, 25.3% 15.8%)',
            }}
            className="aspect-[1026/822] w-[64.125rem] bg-gradient-to-br from-[#22c55e] to-[#4ade80] opacity-30"
          />
        </div>
      )}

      {variant === 'team' && (
        <>
          {/* Center polygon */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/3 -translate-y-1/2 transform-gpu blur-[100px]"
          >
            <div
              style={{
                clipPath:
                  'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              }}
              className="mx-auto aspect-[1/1] w-[50rem] bg-gradient-to-br from-[#4ade80] to-[#22c55e] opacity-35"
            />
          </div>
        </>
      )}
    </div>
  )
}
