import { memo } from "react"
import Styled from "./style"

type Props = {
    maxPages: number,
    currentPage: number,
    onChoosePage: (newPage: number) => void
}

const Pagination = ({ currentPage, maxPages, onChoosePage }: Props) => {
    if ( maxPages === 1 ) {
        return null
    }

    return <Styled.PaginationWrapper>
        {Array.from(new Array(maxPages)).map( (_v, i) => (
            <Styled.PaginationItem 
                onClick={() => onChoosePage(i+1)}
                isCurrent={(i+1) === currentPage}
                key={i}>{i+1}</Styled.PaginationItem>)
        )}
    </Styled.PaginationWrapper>
}

const PaginationMemo = memo(Pagination)
export default PaginationMemo