import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

import { BarChart } from "lucide-react"
import { Skeleton } from '../ui/skeleton'
import AlertMessage from './AlertMessage'

async function fetchDataForDashboardHome() {
    const res = await api.statistics.$get()

    if (!res.ok) {
        const errorMessage = await res.json()
        throw new Error(errorMessage.message || 'An error has occurred while fetching statistics')
    }

    const data = await res.json()
    return data.statistics
}

function DashboardHomeCards() {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ['statistics'],
        queryFn: fetchDataForDashboardHome,
        staleTime: Infinity,
    })

    if (isError) {
      return (
          <AlertMessage Error="Error" message={error.message} />
      )
    }

    return (
        <>
            {isPending ? (
                <>
                    <Skeleton className='w-[300px] h-[150px] mb-3 rounded-sm' />
                    <Skeleton className='w-[300px] h-[150px] mb-3 rounded-sm' />    
                    <Skeleton className='w-[300px] h-[150px] mb-3 rounded-sm' />
                    <Skeleton className='w-[300px] h-[150px] mb-3 rounded-sm' />
                    <Skeleton className='w-[300px] h-[150px] mb-3 rounded-sm' />
                </>
            ) : (
                data && data.map((stat, index) => (
                    <Card key={index} className='mb-4'>
                        <CardHeader>
                        <div className='flex justify-between items-center'>
                            <CardTitle className='text-[1rem]'>{stat.title}</CardTitle>
                            <BarChart className='w-4 h-4 text-foreground' />
                        </div>
                        <CardDescription className='text-[.8rem]'>{stat.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className='text-lg font-semibold'>{stat.value}</p>
                        </CardContent>
                    </Card>
              ))
            )}
        </>
    )
}

export default DashboardHomeCards