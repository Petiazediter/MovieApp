import styled from "styled-components"

const PaginationWrapper = styled.ul({
    listStyle: 'none',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    gap: '5px'
})

const PaginationItem = styled.li<{ isCurrent: boolean }>(({isCurrent}) => ({
    fontWeight: `${isCurrent ? 'bold' : 'normal'}`,
    color: `${isCurrent ? 'white' : 'gray'}`,
    textDecoration: `${isCurrent ? 'underline' : 'none'}`,
    cursor: 'pointer'
}))

const Styled = {
    PaginationWrapper,
    PaginationItem
}

export default Styled