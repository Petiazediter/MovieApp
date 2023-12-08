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
    position: 'relative',
})

const PosterImage = styled.img({
    width: '100%',
    aspectRatio: '6/9'
})

const MovieDetail = styled.section({
    position: 'absolute',
    background: 'black',
    padding: '1em',
    color: 'white',
    bottom: 0,
    width: '100%',
    height: '30%',
    overflow: 'hidden',
    boxSizing: 'border-box',
})

const MovieTitle = styled.h1({
    fontSize: '1em',
    padding: 0,
    margin: 0,
    width: '100%'
})

const Styled = {
    List,
    ListItem,
    PosterImage,
    MovieDetail,
    MovieTitle
}

export default Styled