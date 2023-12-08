import styled from "styled-components";

const List = styled.ul({
    padding: 0,
    listStyle: 'none',
    display: 'grid', 
    gridTemplateColumns: 'auto auto auto auto',
    gap: '1em',

    '@media (max-width: 740px)': {
        display: 'flex',
        flexDirection: 'column',
        gap: '1em'
    }
})

const ListItem = styled.li({
    padding: 0,
    margin: 0,
    overflow: 'hidden',
    position: 'relative',
    minHeight: '300px',

    '@media (max-width: 740px)': {
        maxHeight: '80vh'
    }
})

const PosterImage = styled.img({
    width: '100%',
    aspectRatio: '6/9',
    backgroundColor: 'red',
    '@media (max-width: 740px)': {
        aspectRatio: '1/1'
    }
})

const MovieDetail = styled.section({
    position: 'absolute',
    width: '100%',
    height: '30%',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1em',
    color: 'white',
    background: 'black',
    overflow: 'hidden',
    boxSizing: 'border-box',

    '@media (max-width: 740px)': {
        position: 'relative',
        margin: 0,
        height: 'unset',
    }    
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