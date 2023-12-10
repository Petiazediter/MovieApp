import { memo, useMemo } from "react"
import Styled from "./style"

type Props = {
    maxPages: number,
    currentPage: number,
    onChoosePage: (newPage: number) => void
}

const Pagination = ({ currentPage, maxPages, onChoosePage }: Props) => {
    
    const pages = useMemo( () => {
        const pages = Array.from(new Array(maxPages))
            .map((v, i) => i+1)
        const pageIndex = pages.indexOf(currentPage)
        const startIndex = Math.max(pageIndex-10, 0)
        const endIndex = Math.min(pages.length - 1, pageIndex + 10)
        return pages.slice(startIndex,endIndex)
    },
    [maxPages, currentPage])

    if ( maxPages === 1 ) {
        return null
    }

    return <Styled.PaginationWrapper>
        {pages.map( page => (
            <Styled.PaginationItem 
                onClick={() => onChoosePage(page)}
                isCurrent={(page) === currentPage}
                key={page}>{page}</Styled.PaginationItem>)
        )}
    </Styled.PaginationWrapper>
}

const PaginationMemo = memo(Pagination)
export default PaginationMemo