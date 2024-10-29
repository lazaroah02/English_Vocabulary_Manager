import {useState, createContext, ReactNode, Dispatch, SetStateAction} from 'react'
import { TraductionMode } from '@/types'

const TraductionModeContext = createContext<{mode:TraductionMode, setMode:Dispatch<SetStateAction<TraductionMode>>}>({mode: "en-es", setMode:() => {}})

export function TraductionModeContextProvider({children}:{children: ReactNode}){
    const [mode, setMode] = useState<TraductionMode>('en-es')
    return (
        <TraductionModeContext.Provider value = {{mode, setMode}}>
        {children}
        </TraductionModeContext.Provider>)
}
export default TraductionModeContext