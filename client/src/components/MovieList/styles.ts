import styled from "styled-components";

const List = styled.ul({
    padding: 0,
    listStyle: 'none',
    display: 'grid', 
    gridTemplateColumns: 'auto auto auto auto',
    gap: '1em',
})

const ListItem = styled.li({
    padding: 0,
    margin: 0,
    overflow: 'hidden',
})

const PosterImage = styled.img({
    width: '100%',
    aspectRatio: '6/9'
})

const Styled = {
    List,
    ListItem,
    PosterImage
}

export default Styled