import styled from "styled-components"

const Wrapper = styled.form({
    position: 'relative',
    width: '100%',
    display: 'flex',
    gap: '1em'
})

const SearchBox = styled.input({
    padding: '1em',
    backgroundColor: '#CFCDD8',
    outline: 'none',
    border: 'none',
    borderRadius: '10px',
    width: '100%'
})

const SearchButton = styled.button({
    padding: '1em',
    backgroundColor: '#9688CA',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
    border: 'none',
    outline: 'none',
    borderRadius: '10px',
    width: '30%'
})

const Styled = {
    SearchBox,
    SearchButton,
    Wrapper
}

export default Styled